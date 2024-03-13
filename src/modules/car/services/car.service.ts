import { Injectable } from '@nestjs/common';
import { BaseCarRequestDto } from '../dto/request/base-car.request.dto';
import { UpdateCarRequestDto } from '../dto/request/update-car.request.dto';

@Injectable()
export class CarService {
  create(createCarDto: BaseCarRequestDto) {
    return 'This action adds a new car';
  }

  findAll() {
    return `This action returns all car`;
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: UpdateCarRequestDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
