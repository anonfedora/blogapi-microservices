import {
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String, example: 'Eleazar John Doe' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 25)
  name: string;

  @ApiProperty({ type: String, example: 'dev.mes.anonfedora@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, example: 'anonfedora' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: String, example: '#1John3y24' })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({ type: Boolean, example: false })
  isVerified: boolean;
}
