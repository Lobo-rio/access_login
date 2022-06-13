import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


import { ServiceMessageUtil } from '../util/servicemessage';
import { UserMessage } from '../beans/user/usermessage';
import { UserAllMessage } from '../beans/user/userallmessage';
import { UserCreateDto } from './dto/usercreate.dto';
import { UserUpdateDto } from './dto/userupdate.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(private readonly repository: UsersRepository) { }

    async getUserAll(): Promise<UserAllMessage> {
        this.logger.log('UsersService.getUserAll - Initial');
        this.logger.debug('UsersService.getUserAll - Initial - Filter: {}');

        let response: UserAllMessage = new UserAllMessage();

        try {
            response.user = await this.repository.getUserAll();
            if (!response.user) {
                response.serviceMessage = ServiceMessageUtil.mountServiceMessage(-1, -1, 'User Not Found!'); 
            }
        } catch (error) {
            response.serviceMessage = ServiceMessageUtil.mountServiceMessage(-1, -1, JSON.stringify(error)); 
        }

        this.logger.log('UsersService.getUsertByEmail - End');
        this.logger.debug(JSON.stringify(response), 'UsersService.getUsertByEmail - End - Response: {}');

        return response;
    }

    async getUserByEmail(email: string): Promise<UserMessage> {
        this.logger.log('UsersService.getUsertByEmail - Initial');
        this.logger.debug(JSON.stringify(email), 'UsersService.getUsertByEmail - Initial - Filter: {}');

        let response: UserMessage = new UserMessage();

        try {
            response.user = await this.repository.getUserByEmail(email);
            if (!response.user) {
                response.serviceMessage = ServiceMessageUtil.mountServiceMessage(-1, -1, 'User Not Found!'); 
            } else {
                response.serviceMessage = ServiceMessageUtil.mountServiceMessage(0, 0, 'User registered!'); 
            }
        } catch (error) {
            response.serviceMessage = ServiceMessageUtil.mountServiceMessage(-1, -1, JSON.stringify(error)); 
        }

        this.logger.log('UsersService.getUserByEmail - End');
        this.logger.debug(JSON.stringify(response), 'UsersService.getUserByEmail - End - Response: {}');

        return response;
    }

    async create(userCreateDto: UserCreateDto): Promise<UserMessage> {
        this.logger.log('UsersService.create - Initial');
        this.logger.debug(JSON.stringify(userCreateDto), 'UsersService.create - Initial - Filter: {}');

        let response: UserMessage = new UserMessage();

        try {
            response.user = await this.repository.getUserByEmail(userCreateDto.email);
            if (response.user){
                response.serviceMessage = ServiceMessageUtil.mountServiceMessage(-1, -1, 'User is already registered!');
            }else{
                userCreateDto.password = await bcrypt.hash(userCreateDto.password, 10);

                response.user = await this.repository.create(userCreateDto);
                response.serviceMessage = ServiceMessageUtil.mountServiceMessage(0, 0, 'User created successfully!');    
            } 
        } catch (error) {
            response.serviceMessage = ServiceMessageUtil.mountServiceMessage(-1, -1, JSON.stringify(error)); 
        }
        
        this.logger.log('UsersService.create - End');
        this.logger.debug(JSON.stringify(response), 'UsersService.create - End - Response: {}');

        return response;
    }

    async update(id: string, userUpdateDto: UserUpdateDto ): Promise<UserMessage> {
        this.logger.log('UsersService.update - Initial');
        this.logger.debug(JSON.stringify(userUpdateDto), 'UsersService.update - Initial - Filter: {}');

        let response: UserMessage = new UserMessage();

        try {
            response.user = await this.repository.getUserById(id);
            if (!response.user){
                response.serviceMessage = ServiceMessageUtil.mountServiceMessage(-1, -1, 'User not found!');
            }else{
                response.user = await this.repository.update(id, userUpdateDto);
                response.serviceMessage = ServiceMessageUtil.mountServiceMessage(0, 0, 'User updated successfully!');    
            } 
        } catch (error) {
            response.serviceMessage = ServiceMessageUtil.mountServiceMessage(-1, -1, JSON.stringify(error)); 
        }
        
        this.logger.log('UsersService.update - End');
        this.logger.debug(JSON.stringify(response), 'UsersService.update - End - Response: {}');

        return response;
        
    }

    async delete(id: string): Promise<UserMessage> {
        this.logger.log('UsersService.delete - Initial');
        this.logger.debug(JSON.stringify(id), 'UsersService.delete - Initial - Filter: {}');

        let response: UserMessage = new UserMessage();

        try {
            response.user = await this.repository.getUserById(id);
            if (!response. user){
                response.serviceMessage = ServiceMessageUtil.mountServiceMessage(-1, -1, 'User not found!');
            }else{
                response.user = await this.repository.delete(id);
                response.serviceMessage = ServiceMessageUtil.mountServiceMessage(0, 0, 'User deleted successfully!');    
            } 
        } catch (error) {
            response.serviceMessage = ServiceMessageUtil.mountServiceMessage(-1, -1, JSON.stringify(error)); 
        }
        
        this.logger.log('UsersService.delete - End');
        this.logger.debug(JSON.stringify(response), 'UsersService.delete - End - Response: {}');

        return response;
        
    }

}
