export enum TimeType {
  Default = "DEFAULT",
  Year = "YEAR",
  Month = "MONTH",
  Day = "DAY",
  Hour = "HOUR",
  Minute = "MINUTE"
}

export interface Seconds {
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number
}


function currentYear(): number {
  return new Date().getFullYear();
}

function currentMonth(): number {
  return new Date().getMonth();
}

function currentDate(): number {
  return new Date().getDate();
}

function currentHour():number {
  return new Date().getHours();
}

function currentMinute(): number {
  return new Date().getMinutes();
}

function currentSecond(): number {
  return new Date().getSeconds()
}

const MINUTE: number = 60;
const HOUR: number = MINUTE * 60;
const DAY: number = HOUR * 24;


function getSeconds(time: Seconds): Seconds{
  time.minute = MINUTE;
  time.hour = HOUR;
  time.day = DAY;

  const cm: Date = new Date(currentYear(), currentMonth(), 0);
  const nm: Date = new Date(currentYear(), currentMonth() + 1, 0);
  time.month = (nm.valueOf() - cm.valueOf()) / 1000;

  const cy: Date = new Date(currentYear(), 0, 0);
  const ny: Date = new Date(currentYear() + 1, 0, 0);
  time.year = (ny.valueOf() - cy.valueOf()) / 1000;
  
  return time;

}


function getCurrentSeconds(time: Seconds): Seconds {
  time.minute = currentSecond();
  time.hour = currentMinute() * MINUTE + time.minute;
  time.day = currentHour() * HOUR + time.hour;
  time.month = currentDate() * DAY + time.day;
  const lastMonth = new Date(currentYear(), currentMonth(), 0);
  const firstMonth = new Date(currentYear(), 0, 0);
  time.year = time.month + (lastMonth.valueOf() - firstMonth.valueOf()) / 1000;
  return time
}

function getRate(): Seconds {
  let seconds = {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0
  }

  let total = getSeconds({...seconds});
  let current = getCurrentSeconds({...seconds});

  let rate: Seconds = {...seconds};


  for (let key in rate) {
    let value = (current[key] / total[key]) * 100;
    rate[key] =  +value.toFixed(4);
  }
  return rate;
}

export default getRate;