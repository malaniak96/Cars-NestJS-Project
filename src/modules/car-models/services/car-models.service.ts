import { Injectable } from '@nestjs/common';
import { CarModelsRepository } from '../../repositories/services/car-models.repository';
import { ModelResponseDto } from '../dto/response/car-model.response.dto';

@Injectable()
@Injectable()
export class CarModelsService {
  constructor(private readonly carModelRepository: CarModelsRepository) {}
  public async getAllModels(): Promise<ModelResponseDto[]> {
    return await this.carModelRepository.find();
  }
  public async remove(modelId: string): Promise<any> {
    return `This action removes a #${modelId} brand`;
  }
}
