import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { User } from './entity/auth.entity';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: 'onlyfalopas88',
            signOptions: {
                expiresIn: '60s'
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategyService]
})
export class AuthModule {}
