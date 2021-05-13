import { HttpService, Injectable } from '@nestjs/common';

const COUNTER_PORT = process.env.COUNTER_PORT || 3001;
const COUNTER_HOST = process.env.COUNTER_HOST || 'localhost';

@Injectable()
export class BookNetworking {
  constructor(private readonly httpService: HttpService) {}

  getBooksViews = async (): Promise<Record<string, number>> => {
    const res = await this.httpService
      .get<Record<string, number>>(
        `http://${COUNTER_HOST}:${COUNTER_PORT}/counter`,
      )
      .toPromise();

    return res.data;
  };

  getBookByIdViews = async (id: string): Promise<{ views: number }> => {
    const res = await this.httpService
      .post(`http://${COUNTER_HOST}:${COUNTER_PORT}/counter/${id}/incr`)
      .toPromise();

    return res.data;
  };
}
