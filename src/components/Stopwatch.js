const Stopwatch = props => {
  const { seconds } = props;

  return (
    <div>
      {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
    </div>
  )
}

export default Stopwatch;
