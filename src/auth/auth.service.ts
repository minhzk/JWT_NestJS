
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { comparePasswordHelper } from '@/utils/helper';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/modules/users/schemas/user.schema';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    const isValidPassword = await comparePasswordHelper(pass, user.password)
    if (!user || !isValidPassword) {
      return null;
    }
    const userObject = user.toObject();
    const { password, ...result } = userObject;
    
    return result;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  handleRegister = async(registerDto: CreateAuthDto) => {
    return await this.usersService.handleUserRegister(registerDto)
  }
}
