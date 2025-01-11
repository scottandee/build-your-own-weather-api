import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}
  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByMail(loginDto.email);
    if (!user) throw new NotFoundException('User Not Found');
    
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) throw new BadRequestException('Invalid Email or password');

    return {
      status: 200,
      message: 'Login successfully',
      data: {
        token: this.generateToken(user.id),
        user: user,
      }
    };
  }

  async register(registerDto: RegisterDto) {
    const salt = await bcrypt.genSalt();
    registerDto.password = await bcrypt.hash(registerDto.password, salt);
    const user = await this.usersService.create(registerDto);
    return {
      status: 201,
      message: 'User registered successfully',
      data: {
        token: this.generateToken(user.id),
        user: user,
      }
    }
  }

  generateToken(id: string) {
    const payload = { sub: id };
    return this.jwtService.sign(payload)
  }
}
