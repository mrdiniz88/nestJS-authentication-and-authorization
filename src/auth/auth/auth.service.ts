import { Injectable,HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { User } from '../entity/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

    async create(userDto: CreateUserDto): Promise<User> {
        const { username } = userDto;
        const user = await this.userRepository.findOne({username})
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        return this.userRepository.save(userDto)
    }

    async findOne(condition: any): Promise<User> {
        return this.userRepository.findOne(condition);
    }

    async findAll() {
        return this.userRepository.find()
    }
}
