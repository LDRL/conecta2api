import { Module, OnModuleInit } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PersonModule } from './person/person.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { ResponsibleModule } from './responsible/responsible.module';
import { DirectorModule } from './director/director.module';
import { UsersService } from './users/users.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',  // Tipo de base de datos
      host: process.env.DB_HOST, // Dirección del servidor de base de datos
      port: Number(process.env.DB_PORT),        // Puerto por defecto de PostgreSQL
      username: process.env.DB_USERNAME,  // Nombre de usuario de la base de datos
      password: process.env.DB_PASSWORD,  // Contraseña de la base de datos
      database: process.env.DB_NAME,  // Nombre de la base de datos
      autoLoadEntities: true,
      synchronize: true, // Solo en desarrollo, sincroniza las entidades con la DB
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.DB_HOST_EMAIL,        
        port: process.env.DB_PORT_EMAIL,
        secure: false,
        auth: {
          user:process.env.DB_USER_EMAIL,
          pass: process.env.DB_PASS_EMAIL
        },
      },
      defaults: {
        from:"No reply"
      }
    }),
    TodoModule,
    UsersModule,
    AuthModule,
    PersonModule,
    TeacherModule,
    StudentModule,
    ResponsibleModule,
    DirectorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly userService: UsersService) {}

  async onModuleInit() {
    await this.userService.createAdminIfNotExists();
  }
}
