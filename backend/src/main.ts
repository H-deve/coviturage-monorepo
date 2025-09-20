import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS to allow requests from Angular and Ngrok
  // app.enableCors({
  //   origin: '*', // Allow all origins (for testing, restrict in production)
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   allowedHeaders: ['Content-Type', 'ngrok-skip-browser-warning'], // Required for ngrok
  //   credentials: true,});

  app.enableCors({
    origin: [
      'https://d879-2a01-e0a-405-4470-6cdd-1b1f-f59e-4e40.ngrok-free.app',
      'capacitor://localhost',
      'http://localhost',
      'http://localhost:4200' // For Angular dev server
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'ngrok-skip-browser-warning', // Required for ngrok
      'Accept'
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400
  });

  // main.ts (NestJS)
// app.enableCors({
//   origin: [
//     'https://54ad-2a01-e0a-405-4470-6069-52d8-aa1-c4cd.ngrok-free.app',
//     'capacitor://localhost',
//     'http://localhost',
//     'http://localhost:4200' // For dev testing
//   ],
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//   allowedHeaders: [
//     'Content-Type',
//     'Authorization',
//     'ngrok-skip-browser-warning' // Required for ngrok
//   ],
//   credentials: true,
//   preflightContinue: false,
//   optionsSuccessStatus: 204
// });

  // ✅ Swagger setup (unchanged)
  const config = new DocumentBuilder()
    .setTitle('Covoiturage')
    .setDescription('covoiturage API description')
    .setVersion('1.0')
    .addTag('covoiturage')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
