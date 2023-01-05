import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await new this.userModel({
      ...createUserDto,
      createdAt: new Date(),
    }).save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
