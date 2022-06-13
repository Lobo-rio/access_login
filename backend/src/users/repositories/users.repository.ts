import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

import { PrismaService } from '../../prisma/prisma.service';
import { UserCreateDto } from "../dto/usercreate.dto";
import { UserUpdateDto } from "../dto/userupdate.dto";
import { UsersEntity } from "../entity/users.entity";


@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async getUserAll(): Promise<UsersEntity[]> {
        return this.prisma.user.findMany();
    }

    async getUserById(id: string): Promise<UsersEntity> {
        return this.prisma.user.findUnique({ where: { id: +id } });
    }

    async getUserByEmail(email: string): Promise<UsersEntity> {
        return this.prisma.user.findUnique({ where: { email } });
    }
    
    async create(userCreateDto: UserCreateDto): Promise<UsersEntity> {
        return this.prisma.user.create({
            data: userCreateDto,
        });
    }

    async update(id: string, userUpdateDto: UserUpdateDto ): Promise<UsersEntity> {
        return this.prisma.user.update({
            where: { id: +id },
            data: userUpdateDto
        });
    }

    async delete(id: string): Promise<User> {
        return this.prisma.user.delete({where: {id: +id}});
    }

}