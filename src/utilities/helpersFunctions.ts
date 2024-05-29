import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const generatePassword = (last_name: string) => {
    const newPassword = (last_name += Math.floor(1000 + Math.random() * 90000));
    return newPassword;
  };

  export const hashPassword = async (password: string) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };

export const tokenGenerator = async(data:any)=>{
    if(process.env.APP_SECRET){
        return jwt.sign(data, process.env.APP_SECRET, {expiresIn: `1d`})
    }
}

export const generateEmployeeID = (oldCode: string) => {

  let newCode: string;

  if (oldCode.length === 0) {
    newCode = `OAS-EMP-10101`;
  } else {
      const oldCodeExtractor = oldCode.split("-")[2];
      newCode = `OAS-EMP-${Number(oldCodeExtractor) + 1}`;
    }
    return newCode;
  };


  export const setHours = (date:Date) => {
    const checkInDate = new Date(date);
    checkInDate.setHours(0, 0, 0, 0);
    return checkInDate;
  }

  export const checkClockInTime = (clockInTime:Date) => {
    const nineAM = new Date(clockInTime);
    nineAM.setHours(9, 0, 0, 0); 
    if (clockInTime > nineAM) {
      return 'late';
    } else {
      return 'on-time';
    }
  }

  export const checkClockOutTime = (clockOutTime:Date) => {
    const fivePM = new Date(clockOutTime);
    const eightPM = new Date(clockOutTime);
    eightPM.setHours(20, 0, 0, 0); // Set the time to 8:00 PM
    fivePM.setHours(17, 0, 0, 0); // Set the time to 5:00 PM
  
    if (clockOutTime < fivePM) {
      return 'too early';
    } else if(clockOutTime > fivePM && clockOutTime < eightPM){
      return 'on-time';
    }else {
      return 'late';
    }
  };

  export const confirmCheckIn = (checkIns:Date[], today:Date) => {
  const hasCheckedInToday = checkIns.some(checkIn => {
    const checkInDate = new Date(checkIn);
    checkInDate.setHours(0, 0, 0, 0);
    return checkInDate.getTime() === today.getTime();
  });
  return hasCheckedInToday;
}


export function formatTimeFromISO(isoString: Date): string {
  // Parse the ISO string to a Date object
  const date = new Date(isoString);
  // Extract hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  // Format minutes to always have two digits
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  // Combine into final formatted string
  const formattedTime = `${hours}:${minutesStr}${ampm}`;
  return formattedTime;
}

export const formatDate = (isoString: Date): string => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};