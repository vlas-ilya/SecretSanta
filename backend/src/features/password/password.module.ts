import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';

@Module({
  imports: [],
  providers: [PasswordService],
  exports: [PasswordService],
  controllers: [],
})
export class PasswordModule {}
