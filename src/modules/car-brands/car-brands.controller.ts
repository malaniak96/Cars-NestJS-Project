import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MarkasResponseDto } from './dto/response/car-brand.response.dto';
import { CarBrandsService } from './services/car-brands.service';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { ERole } from '../../common/enums/role.enum';
import { Roles } from '../../common/decorators/roles';
import { RoleGuard } from '../../common/guards/roles.guard';

@ApiTags('Brands')
@Controller('brands')
export class BrandController {
  constructor(private readonly carBrandsService: CarBrandsService) {}

  @SkipAuth()
  @Get()
  public async getAllBrands(): Promise<MarkasResponseDto[]> {
    return await this.carBrandsService.getAll();
  }

  @ApiBearerAuth()
  @Roles(ERole.ADMIN, ERole.MANAGER)
  @UseGuards(RoleGuard)
  @Post('add-new-marks')
  public async createMarkas(): Promise<void> {
    return await this.carBrandsService.createMarkas();
  }
}
