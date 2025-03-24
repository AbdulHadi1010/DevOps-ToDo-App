import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule
  
 } from './tasks/tasks.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://todo-app-user:Kwp4ww2RjYYf3ZTu@todo-app.2t4tb.mongodb.net/?retryWrites=true&w=majority&appName=todo-app'), // Replace with your MongoDB URI
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
