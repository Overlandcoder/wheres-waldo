import { useState, useEffect } from "react";

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(58);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000)

    return () => clearInterval(interval);
  })

  return(
    <div>
      {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
    </div>
  )
}

export default Stopwatch;
