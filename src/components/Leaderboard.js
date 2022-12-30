import { useEffect, useState } from "react";

const Leaderboard = props => {
  const topAmount = 10;
  const [topScores, setTopScores] = useState(undefined);

  useEffect(() => {
    const getTopScores = async () => {
      const response = await fetch(`http://localhost:3000/api/top_scores?&amount=${topAmount}`);
      const data = await response.json();
      setTopScores(data.top_scores);
    }

    getTopScores();
  }, []);

  const { formattedTime } = props;

  return (
    <div className="leaderboard">
      <h2>Top {topAmount} Scores</h2>
      {topScores ? topScores.beach.map((score, index) => {
        return (
          <div key={index} className="score">
            <div>{index + 1}. {score.name} - {formattedTime(score.seconds)}</div>
          </div>
        )
      })
        : null}
    </div>
  )
}

export default Leaderboard;
