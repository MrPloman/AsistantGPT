import { Message } from './message.interface';

export interface OrtographyMessage extends Message {
  userScore?: number;
  errors?: string[];
  message_checked?: string;
  review?: string;
}
