import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {
  async comparePinAndPassword(pin: string, password: string): Promise<boolean> {
    return await bcrypt.compare(pin, password);
  }

  async generatePasswordByPin(pin: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(pin, salt);
  }
}
