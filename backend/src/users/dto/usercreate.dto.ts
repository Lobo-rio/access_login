import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserCreateDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    admin: boolean; 

    @IsNotEmpty()
    password: string;
}