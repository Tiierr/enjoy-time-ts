import React, {useState} from 'react';
import useInterval from '../hooks';

interface BarWidth {
  width: string;
}

interface Props {
  rate: number,
  detail: string,
  type?: string,
  one?: boolean
}

function TimeBar({rate, type, detail, one}: Props) {
  const [width, setWidth] = useState<BarWidth>({width: "0vw"});
  useInterval(
    () => {
      setWidth(getWidth());
    },
    10
  )
  const getWidth = () => {
    return {
      "width": (rate * 80)/100  + "vw"
    }
  }
  const currentClassName = (type ? type : "") + (one ? " One" : "");
  return (
      <>
        <div className={currentClassName}>
          <div className="Progress">
            {detail}的時間進度條: {rate}%
          </div>
          <div className="Graph" >
            <div className="TimeBar" style={width}/>
          </div>
        </div>
      </>
  );
}

export default TimeBar;