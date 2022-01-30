import {Column, Entity, PrimaryGeneratedColumn, BeforeInsert} from "typeorm";

export enum UserRole {
    Admin = 'Admin',
    User = 'User'
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
}