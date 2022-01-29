import {Column, Entity, PrimaryGeneratedColumn, BeforeInsert} from "typeorm";
import * as bcrypt from 'bcrypt';

export enum UserRole {
    Admin = 'admin',
    User = 'user'
}

@Entity('user')
export class User {  
    @PrimaryGeneratedColumn('uuid') id: string;  
    @Column({ 
        type: 'varchar', 
        nullable: false, 
        unique: true 
    }) 
    username: string;
    @Column({ 
        type: 'varchar', 
        nullable: false 
    }) 
    password: string; 
    
    @Column({
        nullable: false, 
        default: UserRole.User
    })
    role: UserRole;

    @BeforeInsert()  async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }
}