import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { BookCommentService } from '../core/book.comment.service';
import { BookCommentEvents } from '../interface/book.comments.interface';
import { BookComment } from '../model/book.comment.model';

@WebSocketGateway(80, { namespace: 'comments' })
export class BookCommentGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly bookCommentService: BookCommentService) {}

  @SubscribeMessage(BookCommentEvents.ADD_COMMENT)
  addComment(@MessageBody() data): Observable<WsResponse<'ok' | 'error'>> {
    return from(this.bookCommentService.createBookComment(data)).pipe(
      map((res) => {
        if (res === null)
          throw new WsException('An error occured while creating comment');
        return { event: BookCommentEvents.ADD_COMMENT, data: 'ok' };
      }),
    );
  }

  @SubscribeMessage(BookCommentEvents.GET_ALL_COMMENTS)
  getAllComments(@MessageBody() data): Observable<WsResponse<BookComment[]>> {
    return from(this.bookCommentService.getAllBookComments(data)).pipe(
      map((res) => {
        if (res === null)
          throw new WsException('An error occured while getting book comments');

        return { event: BookCommentEvents.GET_ALL_COMMENTS, data: res };
      }),
    );
  }
}
