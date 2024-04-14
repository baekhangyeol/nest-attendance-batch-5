import { Controller, Get, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get('ranking')
  async getAttendanceRankingList(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('date') dateStr: string,
  ) {
    const paginationDto = new PaginationDto();
    paginationDto.page = parseInt(page, 10);
    paginationDto.limit = parseInt(limit, 10);
    const date = dateStr ? new Date(dateStr) : new Date();
    return this.attendanceService.getAttendanceRankingList(paginationDto, date);
  }
}