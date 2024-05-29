import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Leave from '../../models/leaveModel/leave';
import Attendance from '../../models/attendanceModel/attendance';
import moment from 'moment';

export const graphAttendance = async(request:JwtPayload, response:Response) => {
    try {
        const today = moment();
        const dayOfWeek = today.isoWeekday();
    
        let startOfWeek: moment.Moment;
        let endOfWeek: moment.Moment;
    
        if (dayOfWeek > 5) {
          // Weekend, fetch previous week's data
          startOfWeek = today.clone().subtract(1, 'weeks').startOf('isoWeek').isoWeekday(1);
          endOfWeek = startOfWeek.clone().add(4, 'days');
        } else {
          // Weekday, fetch current week's data up to today
          startOfWeek = today.clone().startOf('isoWeek').isoWeekday(1);
          endOfWeek = today.clone();
        }
    
        const attendanceData = await Attendance.find({
          date: {
            $gte: startOfWeek.toDate(),
            $lte: endOfWeek.toDate()
          }
        });
    
        const result = attendanceData.reduce((acc: Record<string, { late_comers: number; early_comers: number }>, item) => {
          const day = moment(item.date).format('dddd'); // Get the day name
          if (!acc[day]) {
            acc[day] = {
              late_comers: 0,
              early_comers: 0
            };
          }

          const itemSTatus = item.clockInStatus;
         item.clockInStatus === 'late' ? acc[day].late_comers ++ : acc[day].early_comers ++;
        //   acc[day].early_comers += item.early_comers;
          return acc;
        }, {});
    
        let attendanceExtractor = Object.values(result);

        const lateComersArray: number[] = [];
        const earlyComersArray: number[] = [];

        attendanceExtractor.forEach(record => {
        lateComersArray.push(record.late_comers);
        earlyComersArray.push(record.early_comers);
        });

        return response.status(200).json({
            message: 'Graph Attendance data',
            lateComersArray,
            earlyComersArray
        });
      } catch (error:any) {
        response.status(500).json({ message: error.message });
      }
}