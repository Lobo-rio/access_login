import { ApiProperty } from '@nestjs/swagger';
import { ListaMensagem } from './listamensagem';

export class ServiceMessageType {
  
   constructor(){
     this.codigoRetorno = undefined;
     this.serviceMessage = undefined;
   }

   @ApiProperty()
   codigoRetorno: number;

   @ApiProperty()
   serviceMessage: ListaMensagem;
}