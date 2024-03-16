import { NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfig, Config } from './configs/configs.type';
import { AppModule } from './modules/app.module';
import { SwaggerHelper } from './common/helpers/swagger.helper';
import { AdminService } from './modules/admin/services/admin.service';
import { Admin } from './modules/admin/constants/admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cars-Market API')
    .setDescription('API description')
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelExpandDepth: 3,
      persistAuthorization: true,
    },
  });

  const adminService = app.get<AdminService>(AdminService);
  try {
    const existingAdmin = await adminService.getAdmin();
    if (existingAdmin) {
      new Logger().log('Admin account already exists');
    } else {
      await adminService.createAdmin(Admin);
      new Logger().log('ROOT ADMIN was successfully created');
    }
  } catch (error) {
    console.error('Failed to create ROOT ADMIN', error);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );
  const configService = app.get(ConfigService<Config>);
  const appConfig = configService.get<AppConfig>('app');
  await app.listen(appConfig.port, () => {
    const url = `https://${appConfig.host}:${appConfig.port}`;
    Logger.log(`Server running ${url}`);
    Logger.log(`Swagger running ${url}/docs`);
  });
}
void bootstrap();
