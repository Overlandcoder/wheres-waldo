const ScoreTable = props => {
  const { scores, formattedTime } = props;
  const even = num => num % 2 === 0

  return (
    <table>
      {scores && scores.length > 0 ?
        <tbody>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time</th>
          </tr>
          {scores ? scores.map((score, index) => {
            return (
              <tr key={index} className={even(index) ? "score even" : "score"}>
                <td>{index + 1}</td>
                <td>{score.name}</td>
                <td>{formattedTime(score.seconds)}</td>
              </tr>
            )
          })
            : null}
        </tbody>
        :
        <tbody>
          <tr><td>No scores yet</td></tr>
        </tbody>
      }
    </table>
  )
}

export default ScoreTable;
