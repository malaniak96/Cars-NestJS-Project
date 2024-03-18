import { Injectable, NotFoundException } from '@nestjs/common';
import { CarRepository } from '../../repositories/services/car.repository';

@Injectable()
export class CarAdsViewsService {
  constructor(private readonly carRepository: CarRepository) {}

  async trackCarView(carId: string) {
    const car = await this.carRepository.findOne({ where: { id: carId } });
    if (!car) {
      throw new NotFoundException(`Car with ID ${carId} not found`);
    }

    car.totalViews += 1;
    car.viewsToday += 1;
    car.viewsThisWeek += 1;
    car.viewsThisMonth += 1;

    await this.carRepository.save(car);
  }

  async getViewCountForPeriod(
    carId: string,
    period: 'day' | 'week' | 'month',
  ): Promise<number> {
    const car = await this.carRepository.findOne({ where: { id: carId } });
    if (!car) {
      throw new NotFoundException(`Car with ID ${carId} not found`);
    }

    const currentDate = new Date();
    let startDate: Date;
    let endDate: Date;
    //
    if (period === 'day') {
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
      );
      endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1,
      );
    } else if (period === 'week') {
      const firstDayOfWeek = currentDate.getDate() - currentDate.getDay();
      startDate = new Date(currentDate.setDate(firstDayOfWeek));
      endDate = new Date(currentDate.setDate(firstDayOfWeek + 7));
    } else if (period === 'month') {
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1,
      );
      endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
      );
    }

    return await this.carRepository
      .createQueryBuilder('car')
      .where('car.id = :carId', { carId })
      .andWhere('car.created >= :startDate AND car.created <= :endDate', {
        startDate,
        endDate,
      })
      .getCount();
  }
}
