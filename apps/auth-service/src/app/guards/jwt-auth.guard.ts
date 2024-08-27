import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.access_token;
    if (!token) {
      return false;
    }
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('AUTH_SECRET'),
      });
      request.user = payload;
    } catch (error) {
      return false;
    }
    return true;
  }

  private extractTokenFromHeader(request: any): string | null {
    const [type, token] = request.headers.authentication?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
