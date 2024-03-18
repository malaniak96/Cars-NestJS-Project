import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { MarkasResponseDto } from '../dto/response/car-brand.response.dto';
import { CarBrandsRepository } from '../../repositories/services/car-brands.repository';

@Injectable()
@Injectable()
export class CarBrandsService {
  constructor(
    @InjectEntityManager()
    private readonly CarBrandsRepository: CarBrandsRepository,
  ) {}

  public async getAll(): Promise<MarkasResponseDto[]> {
    return await this.CarBrandsRepository.find();
  }
  public async createMarkas(): Promise<void> {}
}
