import { PartialType } from '@nestjs/swagger';
import { UserCreateDto } from './usercreate.dto';

export class UserUpdateDto extends PartialType(UserCreateDto) {}