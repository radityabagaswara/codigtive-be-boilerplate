import { Injectable } from '@nestjs/common';
import { UserInitService } from './user/user-init.service';

@Injectable()
export class DbinitService {
  constructor(private readonly userInitService: UserInitService) {}

  async init() {
    await this.userInitService.init();
  }
}
