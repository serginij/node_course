import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import path from 'path';
import session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // somewhere in your initialization file
  app.use(
    session({
      secret: process.env.COOKIE_SECRET as string,
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.setViewEngine('ejs');
  app.setBaseViewsDir(path.join(__dirname, 'views'));

  const logger = new Logger('Bootstrap');

  await app.listen(process.env.PORT || 3000, () => {
    logger.log(
      `Server started in ENV: ${
        process.env.NODE_ENV?.toUpperCase() || 'development'
      } | PORT: ${process.env.PORT ?? 3000}`,
    );
  });
}
bootstrap();
