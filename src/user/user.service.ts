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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
