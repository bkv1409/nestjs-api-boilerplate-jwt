import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { IUsers } from '../users/interfaces/users.interface';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class RegisterService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
  ) {}

  public async register(registerUserDto: RegisterUserDto): Promise<IUsers> {
    registerUserDto.password = bcrypt.hashSync(registerUserDto.password, 8);

    // this.sendMailRegisterUser(registerUserDto);
    this.sendMailRegisterUserAsync(registerUserDto).then(r => {console.log('test '+r)});

    return this.usersService.create(registerUserDto);
  }

  private sendMailRegisterUser(user): void {
    this.mailerService
      .sendMail(this.buildEmailObj(user))
      .then((response) => {
        console.log(response);
        console.log('User Registration: Send Mail successfully!');
      })
      .catch((err) => {
        console.log(err);
        console.log('User Registration: Send Mail Failed!');
      });
  }

  private async sendMailRegisterUserAsync(user): Promise<void> {
    try {
      const result = await this.mailerService.sendMail(this.buildEmailObj(user));
      console.log(result);
      console.log('User Registration: Send Mail successfully!');
    } catch (err) {
      console.log(err);
      console.log('User Registration: Send Mail Failed!');
    }
  }

  /**
   *
   * @param user
   * @private
   */
  private buildEmailObj(user): object {
    return {
      to: user.email,
      from: 'from@example.com',
      subject: 'Registration successful ✔',
      text: 'Registration successful!',
      template: 'index',
      context: {
        title: 'Registration successfully',
        description: "You did it! You registered!, You're successfully registered.✔",
        nameUser: user.name,
      },
    };
  }
}
