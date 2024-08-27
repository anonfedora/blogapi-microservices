import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/schemas/user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject('AUTH-SERVICE') private readonly kafkaClient: ClientKafka
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('login-success');
    await this.kafkaClient.connect();
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    const existingUser = await this.userService.findByEmail(
      createUserDto.email
    );

    if (!existingUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.createUser(createUserDto);
    console.log('user', user);
    await this.userService.save(user);

    const payload = { username: user.email, sub: user['id'] };
    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
      user: {
        name: user.name,
        username: user.username,
        isVerified: user.isVerified,
        email: user.email,
      },
    };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    console.log('app.service.validateuser', user);
    console.log('bcrypt' + (await bcrypt.compare(password, user.password)));
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(loginUserdto: LoginUserDto) {
    const user = await this.validateUser(
      loginUserdto.email,
      loginUserdto.password
    );
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload = { username: user.email, sub: user['id'] };
    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('AUTH_SECRET', {
        infer: true,
      }),
      expiresIn: this.configService.getOrThrow('AUTH_EXPIRES'),
    });

    this.kafkaClient.emit('login-success', user);

    return {
      access_token,
      user: {
        name: user.name,
        username: user.username,
        isVerified: user.isVerified,
        email: user.email,
      },
    };
  }
}
