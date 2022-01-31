import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../entity/auth.entity";

export class CreateUserDto {  
    
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
    
    @ApiProperty()
    role?: UserRole
}