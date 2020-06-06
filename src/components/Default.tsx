import React from 'react';
import TimeBar from './TimeBar';

function Default({year, month, day, hour, minute}) {
  return (
      <>
        <div className="Title">
          Enjoy {new Date().getFullYear()}
        </div>
        <TimeBar rate={year} detail="今年" type="Year" />
        <TimeBar rate={month} detail="本月" type="Month" />
        <TimeBar rate={day} detail="本天" type="Day" />
        <TimeBar rate={hour} detail="本小時" type="Hour" />
        <TimeBar rate={minute} detail="本分鐘" type="Minute"/>
      </>
  );
}

export default Default;