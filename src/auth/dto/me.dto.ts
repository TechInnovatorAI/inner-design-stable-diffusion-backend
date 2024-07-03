import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class MeDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
