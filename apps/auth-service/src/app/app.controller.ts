import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { AppService } from './app.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@ApiBearerAuth('access_token')
@Controller('auth')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() createUserDto: CreateUserDto
  ): Promise<RegisterResponseDto> {
    const existingUser = await this.usersService.findByEmail(
      createUserDto.email
    );

    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    const result = await this.appService.register(createUserDto);

    return {
      status: 'Success',
      message: 'Registration success',
      data: result,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
    try {
      const result = await this.appService.login(loginUserDto);
      return {
        status: 'Success',
        message: 'Login successful',
        data: result,
      };
    } catch (error) {
      console.log('error', error);
      throw new HttpException(
        {
          status: 'Bad request',
          message: 'Authentication failed',
          statusCode: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}
