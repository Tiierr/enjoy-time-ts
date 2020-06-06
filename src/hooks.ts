import {useEffect, useRef} from 'react';


interface RefObject {
  current: Callback
}

interface Callback {
  (): void
}

function useInterval(callback: Callback, delay: number) {
  const savedCallback  = useRef<Callback>();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (typeof savedCallback.current === 'function'){
        savedCallback.current();  
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;