import { ApiProperty } from '@nestjs/swagger';

export class Mensagem {

   constructor(){
      this.codigo = undefined;
      this.mensagem = undefined;
   }

   @ApiProperty()
   codigo: number;

   @ApiProperty()
   mensagem: string;

}