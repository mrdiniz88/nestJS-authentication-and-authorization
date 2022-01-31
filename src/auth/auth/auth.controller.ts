import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from '../guards/jwt.guard';
import { Role } from '../decorators/role.decorator';
import { RoleGuard } from '../guards/role.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

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
        
        const user = await this.authService.findByLogin(userDto)
        
        const payload = {
            sub: user.id,
            username: user.username,
            role: user.role
        }

        const token = this.jwtService.sign(payload)

        return {user, token}
    }

    @Role('Admin')
    @UseGuards(JwtGuard, RoleGuard)
    @ApiBearerAuth()
    @Get('read')
    read(@Req() req) {
        console.log(req.user);
        return this.authService.findAll();
    }

}
