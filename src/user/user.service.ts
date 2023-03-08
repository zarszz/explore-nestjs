import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { SingleUserDto } from './dto/response/single-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<SingleUserDto> {
    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    const newUser = await this.userRepository.save(user);

    return <SingleUserDto>{ id: newUser.id, email: newUser.email };
  }

  async findAll(): Promise<SingleUserDto[]> {
    const dtos: SingleUserDto[] = [];
    const users = await this.userRepository.find();

    for (const user of users) {
      const dto = <SingleUserDto>{
        email: user.email,
        id: user.id,
      };
      dtos.push(dto);
    }

    return dtos;
  }

  async findOne(id: number): Promise<SingleUserDto> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User not found');
    }

    return <SingleUserDto>{
      id: user.id,
      email: user.email,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User not found');
    }

    user.email = updateUserDto.email;

    await this.userRepository.save(user);

    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User not found');
    }

    this.userRepository.delete(user);

    return `This action removes a #${id} user`;
  }
}
