import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { User, UserSchema } from './users/schemas/users.schema';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exception';
@Module({
  imports: [
    BooksModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/user'),
    // MongooseModule.forFeatureAsync([
    //   {
    //     name: User.name,
    //     useFactory: () => {
    //       const schema = UserSchema;
    //       schema.post('save', function () {
    //         console.log('Hello from pre save');
    //         console.log('schema=', schema);
    //         console.log('User=', User);
    //       });
    //       return schema;
    //     },
    //   },
    // ]),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
