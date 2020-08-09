import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class RegisterUserDTO {
  id: number;

  @IsString()
  @MaxLength(30)
  name: string;

  @IsString()
  @MaxLength(40)
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  password: string;
}