import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsDate } from 'class-validator';

export class PaginateUserDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  skip: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  take: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  orderBy: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  order: string;

  @IsString()
  @ApiProperty()
  search: string;

  @IsString()
  @ApiProperty()
  startDate: string;

  @IsString()
  @ApiProperty()
  endDate: string;
}
