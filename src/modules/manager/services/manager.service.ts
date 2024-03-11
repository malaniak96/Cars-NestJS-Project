import { Injectable } from '@nestjs/common';
import { CreateManagerRequestDto } from '../dto/request/create-manager.request.dto';

@Injectable()
export class ManagerService {
  create(createManagerDto: CreateManagerRequestDto) {
    return 'This action adds a new manager';
  }

  findAll() {
    return `This action returns all manager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manager`;
  }

  // update(id: number, updateManagerDto: UpdateManagerDto) {
  //   return `This action updates a #${id} manager`;
  // }

  remove(id: number) {
    return `This action removes a #${id} manager`;
  }
}
