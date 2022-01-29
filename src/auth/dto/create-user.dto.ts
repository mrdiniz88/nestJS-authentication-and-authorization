import { UserRole } from "../entity/auth.entity";

export class CreateUserDto {  
    username: string;
    password: string;
    role?: UserRole
}