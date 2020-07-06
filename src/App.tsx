import React, {useState} from 'react';
import {useLocalStorage} from '@rehooks/local-storage';

import getRate, {Seconds, TimeType} from './time';
import useInterval from './hooks'
import Default from './components/Default';
import TimeBar from './components/TimeBar';
import Setting from './components/Setting';

interface TabProps {
  type: TimeType,
  rate: Seconds
}

function Tab({type, rate}: TabProps) {
  if (type === TimeType.Year) {
    return <TimeBar rate={rate.year} detail="今年" one={true} />

  }
  else if (type === TimeType.Month) {
    return <TimeBar rate={rate.month} detail="本月" one={true} />
  }
  else if (type === TimeType.Day) {
    return <TimeBar rate={rate.day} detail="本天" one={true} />

  }
  else if (type === TimeType.Hour) {
    return <TimeBar rate={rate.hour} detail="本小时" one={true} />
  }
  else if (type === TimeType.Minute) {
    return <TimeBar rate={rate.minute} detail="本分钟" one={true} />
  }
  else {
    return <Default {...rate} />
  }

}


function App() {
  const [rate, setRate] = useState<Seconds>(getRate());
  const [tab, setTab] = useLocalStorage<TimeType>('tab', TimeType.Default);
  useInterval(
    () => {
      setRate(getRate());
    },
    10
  )

  return (
    <div className="App">
      <div className="Time">
        <div className="Bar">
          <Tab type={tab} rate={rate} />
        </div>
      </div>
      <Setting action={setTab} currentTab={tab} />
    </div>
  );
}

export default App;
