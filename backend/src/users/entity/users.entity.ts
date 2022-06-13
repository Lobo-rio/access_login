import { User } from "@prisma/client";


export class UsersEntity implements User {
    id: number;
    name: string;
    email: string;
    phone: string;
    admin: boolean;
    password: string;
    created_at: Date;
    updated_at: Date;
}