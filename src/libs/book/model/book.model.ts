import { Injectable } from '@nestjs/common';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@Injectable()
export class Book {
  @Prop({ required: true })
  public title: string;

  @Prop({ default: '' })
  public description: string;

  @Prop({ required: true })
  public authors: string;

  @Prop({ default: false })
  public favorite: boolean;

  @Prop({ default: '' })
  public fileCover: string;

  @Prop({ default: '' })
  public fileBook: string;
}

export type BookDocument = Book & Document;

export const BookSchema = SchemaFactory.createForClass(Book);
