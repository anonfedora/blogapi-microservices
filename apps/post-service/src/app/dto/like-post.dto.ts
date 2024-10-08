import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LikePostDto {
  @ApiProperty({
    type: String,
    description: 'Liking a post by a logged in user',
    example: '668fadfb9bad5df501238667',
  })
  @IsString()
  @IsNotEmpty()
  postId: string;
}
