import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const createdUser = this.userModel.create(createUserDto);
    return await createdUser;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).select('+password');
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return this.userModel.findById({ _id: id });
  }

  async save(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.userModel.findById({ _id: id });
    if (!user) {
      throw new NotFoundException('User with id not found!');
    }
    return this.userModel.findByIdAndUpdate(
      { _id: id, updateUserDto },
      { new: true }
    );
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
