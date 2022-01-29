import { Body, Controller, Post, HttpStatus, HttpException, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../entity/auth.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from '../guard/jwt.guard';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private jwtService: JwtService
    ){}

    @Post('register')
    async register(
        @Body() userDto: CreateUserDto
    ){

        const { username, password, role } = userDto;
        const hashedPassword = await bcrypt.hash(password, 12);
    
        
        const user = await this.authService.create({
            username,
            role,
            password: hashedPassword
        })
       
        delete user.password

  
        return user;
    }

    @Post('login')
    async login(
        @Body() userDto: LoginUserDto,
    ){

        const { username, password } = userDto;
        
        const user = await this.authService.findOne({username})
        
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        if(!await bcrypt.compare(password, user.password)) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        const payload = {
            sub: user.id,
            username: user.username
        }

        const token = this.jwtService.sign(payload)
        return {user, token};
    }


    @UseGuards(JwtGuard)
    @Get('test-auth')
    test() {
        return this.authService.findAll()
    }
}
