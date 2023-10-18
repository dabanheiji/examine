import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { QuestionModule } from './question/question.module';
import { Question } from './question/entities/question.entity';
import { Answer } from './question/entities/answer.entity';
import { Category } from './question/entities/category.entity';
import { TestPaperModule } from './test_paper/test_paper.module';
import { TestPaper } from './test_paper/entities/test_paper.entity';
import { TestPlanModule } from './test_plan/test_plan.module';
import { DeptModule } from './dept/dept.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('jwt_secret'),
          signOptions: {
            expiresIn: '30m',
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env',
    }),
    TypeOrmModule.forRootAsync({
      async useFactory(configService: ConfigService) {
        return {
          type: 'mysql',
          host: configService.get('mysql_server_host'),
          port: configService.get('mysql_server_port'),
          username: configService.get('mysql_server_username'),
          password: configService.get('mysql_server_password'),
          database: configService.get('mysql_server_database'),
          synchronize: true,
          logging: true,
          poolSize: 10,
          entities: [User, Question, Answer, Category, TestPaper],
          connectorPackage: 'mysql2',
          extra: {
            authPlugin: 'sha256_password',
          },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    QuestionModule,
    TestPaperModule,
    TestPlanModule,
    DeptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
