import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';

import { User } from './schemas/users.schema';
import { UserService } from './users.service';
import { UpdateUserDto } from './dto/update.dto';
import { HttpExceptionFilter, MongoExceptionFilter } from '../exception';

@Controller('/users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  @UseFilters(new HttpExceptionFilter(), new MongoExceptionFilter())
  get(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  @UseFilters(new HttpExceptionFilter(), new MongoExceptionFilter())
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Delete('/:id')
  @UseFilters(new HttpExceptionFilter(), new MongoExceptionFilter())
  delete(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id);
  }

  @Post()
  @UseFilters(new HttpExceptionFilter(), new MongoExceptionFilter())
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Patch('/:id')
  @UseFilters(new HttpExceptionFilter(), new MongoExceptionFilter())
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }
}
