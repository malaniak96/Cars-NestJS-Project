import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { CarModelsService } from './services/car-models.service';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { RoleGuard } from '../../common/guards/roles.guard';
import { ModelResponseDto } from './dto/response/car-model.response.dto';
import { Roles } from '../../common/decorators/roles';
import { ERole } from '../../common/enums/role.enum';

@ApiTags('Models')
@Controller('models')
export class BrandController {
  constructor(private readonly carBrandsService: CarModelsService) {}

  @SkipAuth()
  @Get()
  public async getAllBrands(): Promise<ModelResponseDto[]> {
    return await this.carBrandsService.getAllModels();
  }

  @ApiBearerAuth()
  @Roles(ERole.ADMIN, ERole.MANAGER)
  @UseGuards(RoleGuard)
  @Delete('delete-model')
  public async delete(
    @Param('modelId', ParseUUIDPipe) modelId: string,
  ): Promise<any> {
    return await this.carBrandsService.remove(modelId);
  }
}
