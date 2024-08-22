import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ type: String, example: 'Eleazar John' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: 'dev.mes.anonfedora@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, example: '#1John3y24' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ type: String, example: '2348089739047' })
  @IsString()
  phone?: string;
}
