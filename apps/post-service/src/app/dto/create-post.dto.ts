import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ type: String, example: 'New Post' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 25)
  title: string;

  @ApiProperty({
    type: String,
    example: 'Contents of the newly created post',
  })
  @IsString()
  @IsNotEmpty()
  content: String;

  @ApiProperty({
    type: String,
    example: '6693222730d3c66ed76ea61d',
  })
  @IsString()
  categoryId: string;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isPublished: boolean;
}
