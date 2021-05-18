import { Injectable } from '@nestjs/common';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@Injectable()
export class BookComment {
  @Prop({ required: true })
  public bookId: string;

  @Prop({ required: true })
  public comment: string;
}

export type BookCommentDocument = BookComment & Document;

export const BookCommentSchema = SchemaFactory.createForClass(BookComment);
