import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const emailExists = await this.usersRepository.findOne({
      where: { email: createUserDto.email }
    });
    if (emailExists) {
      throw new BadRequestException('Account with email already exists');
    }
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneByMail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email }
    });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
