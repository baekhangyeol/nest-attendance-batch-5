import { AttendanceStatusEnum } from '../../entities/attendance-status.enum';
import { User } from '../../entities/user.entity';

export class GetAttendanceRankingResponseDto {
  id: number;
  ranking: number;
  userId: number;
  attendanceCount: number;
  user: { studentId: any; name: any; id: any; department: any };
}