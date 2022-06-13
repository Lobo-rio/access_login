import { ApiProperty } from '@nestjs/swagger';
import { UsersEntity } from '../../users/entity/users.entity';
import { ServiceMessageType } from '../mensagemretorno/servicemessagetype';

export class UserMessage {
  
  constructor(){
    this.user = undefined;
    this.serviceMessage = undefined;
  }
  
  @ApiProperty()
  user?: UsersEntity;
  
  @ApiProperty()
  serviceMessage: ServiceMessageType;

}