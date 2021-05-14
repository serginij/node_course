import { Injectable } from '@nestjs/common';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@Injectable()
export class User {
  @Prop({ required: true })
  public username: string;

  @Prop({ required: true })
  public email: string;

  @Prop({ required: true })
  public password: string;

  @Prop({ default: '' })
  public displayName: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
