import { Message } from 'app/interfaces/message.interface';

export const MessagesMock: Message[] = [
  {
    text: 'Hola Mundo',
    isGpt: true,
  },
  {
    text: 'Cual es tu color favorito?',
    isGpt: false,
  },
];
