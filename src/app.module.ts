import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolModule } from './rol/rol.module';

@Module({
  imports: [RolModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
