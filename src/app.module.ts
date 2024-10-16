import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './config';
import { AppController } from './controllers';
import { AppService, EvaluationService } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      load: [getConfig],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, EvaluationService],
})
export class AppModule {}
