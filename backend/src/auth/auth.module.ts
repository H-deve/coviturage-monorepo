import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refresh.strategy';
import { UtilisateurModule } from '../models/utilisateur/utilisateur.module'; // Import the Utilisateur module
import { ConfigModule } from '@nestjs/config';
import { VoitureModule } from 'src/models/voiture/voiture.module';



@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET, // Use JWT_ACCESS_SECRET
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRATION }, // Use JWT_ACCESS_EXPIRATION
    }),
    UtilisateurModule,
    VoitureModule,

  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}