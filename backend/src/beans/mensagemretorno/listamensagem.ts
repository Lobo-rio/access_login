import { ApiProperty } from '@nestjs/swagger';
import { Mensagem } from './mensagem';

export class ListaMensagem {
   
   constructor(){
      this.mensagem = undefined;
   }
   
   @ApiProperty()
   mensagem: Mensagem[];
}