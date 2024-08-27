import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DislikePostDto {
  @ApiProperty({
    type: String,
    description: 'Disliking a post by a logged in user',
    example: '668fadfb9bad5df501238667',
  })
  @IsString()
  @IsNotEmpty()
  postId: string;
}
