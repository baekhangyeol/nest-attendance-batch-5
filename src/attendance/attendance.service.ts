import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';
import { GetAttendanceRankingResponseDto } from './dto/response/get-attendanceRanking-response.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { createPaginationResult, PaginationResult } from '../common/util/pagination.util';
import { User } from './entities/user.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) {
  }

  async getAttendanceRankingList(dto: PaginationDto, date: Date): Promise<PaginationResult<GetAttendanceRankingResponseDto>> {
    const startDate = new Date(date);
    startDate.setMonth(startDate.getMonth() - 1);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    console.log(`Querying from ${startDate.toISOString()} to ${endDate.toISOString()}`);

    const attendances = await this.attendanceRepository.createQueryBuilder('attendance')
      .select('user.id', 'userId')
      .addSelect('user.name', 'name')
      .addSelect('user.department', 'department')
      .addSelect('user.studentId', 'studentId')
      .addSelect('COUNT(attendance.id)', 'attendanceCount')
      .innerJoin('attendance.user', 'user')
      .where('attendance.attendanceTime BETWEEN :startDate AND :endDate', { startDate, endDate })
      .andWhere('attendance.status = :status', { status: 'PRESENT' })
      .groupBy('user.id')
      .addGroupBy('user.name')
      .addGroupBy('user.department')
      .addGroupBy('user.studentId')
      .orderBy('attendanceCount', 'DESC')
      .getRawMany();

    let currentRank = 0;
    let lastCount = null;
    let skipNext = 0;
    const results = attendances.map((att, index) => {
      if (lastCount !== att.attendanceCount) {
        lastCount = att.attendanceCount;
        currentRank += 1 + skipNext;
        skipNext = 0;
      } else {
        skipNext++;
      }

      const dto = new GetAttendanceRankingResponseDto();
      dto.id = att.userId;
      dto.userId = att.userId;
      dto.user = {
        id: att.userId,
        name: att.name,
        department: att.department,
        studentId: att.studentId,
      };
      dto.attendanceCount = parseInt(att.attendanceCount);
      dto.ranking = currentRank;
      return dto;
    });

    return createPaginationResult(results, dto.page, dto.limit, results.length);
  }

}
