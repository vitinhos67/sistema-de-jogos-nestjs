import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { AllExeptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExeptionsFilter());

  await app.listen(3001);
}
bootstrap();
