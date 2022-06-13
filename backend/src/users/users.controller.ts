import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';

import { UserMessage } from '../beans/user/usermessage';
import { UserAllMessage } from '../beans/user/userallmessage';
import { UserCreateDto } from './dto/usercreate.dto';
import { UserUpdateDto } from './dto/userupdate.dto';
import { UsersService } from './users.service';

@Controller('/app/users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);

    constructor(private readonly usersService: UsersService) { }

    @Get('/all')
    async getUserAll(): Promise<UserAllMessage> {
      this.logger.log('UsersController.getUserAll - Initial');
      this.logger.debug('UsersController.getUserAll  - Initial - Filter: {}');

      return this.usersService.getUserAll();
    }
    
    @Get('/:email')
    async getUserByEmail(@Param('email') email: string): Promise<UserMessage> {
      this.logger.log('UsersController.getUsertByEmail - Initial');
      this.logger.debug(JSON.stringify(email), 'UsersController.getUsertByEmail  - Initial - Filter: {}');

      return this.usersService.getUserByEmail(email);
    }

    @Post()
    async create(@Body() userCreateDto: UserCreateDto): Promise<UserMessage> {
      this.logger.log('UsersController.create - Initial');
      this.logger.debug(JSON.stringify(userCreateDto), 'UsersController.create  - Initial - Filter: {}');

      return this.usersService.create(userCreateDto);
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() userUpdateDto: UserUpdateDto): Promise<UserMessage> {
      this.logger.log('UsersController.update - Initial');
      this.logger.debug(JSON.stringify(id), JSON.stringify(userUpdateDto), 'UsersController.update  - Initial - Filter: {}');

      return this.usersService.update(id, userUpdateDto);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<UserMessage> {
      this.logger.log('UsersController.delete - Initial');
      this.logger.debug(JSON.stringify(id), 'UsersController.delete  - Initial - Filter: {}');

      return this.usersService.delete(id);
    }

}
