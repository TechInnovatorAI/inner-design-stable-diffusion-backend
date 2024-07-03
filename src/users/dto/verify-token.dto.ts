import { IsString, IsNotEmpty } from 'class-validator';

export class VerifyTokenDto {
  @IsString()
  @IsNotEmpty()
  verifytoken: string;
}
