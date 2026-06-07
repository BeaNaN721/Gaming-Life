import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  findByUsername(username: string) {
    return this.userRepo.findOne({ where: { username } });
  }
  findById(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }
  create(username: string, hashedPassword: string) {
    const user = this.userRepo.create({ username, password: hashedPassword });
    return this.userRepo.save(user);
  }
}
