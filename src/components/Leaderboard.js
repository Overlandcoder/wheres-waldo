import { useEffect, useState } from "react";
import ScoreTable from "./ScoreTable";

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

  const { mapNames, formattedTime } = props;

  return (
    <div className="leaderboard">
      <h1 className="border-bottom-yellow">Top {topAmount} Scores</h1>
      {mapNames.map((mapName, index) => {
        return (
          <div key={index} className="text-center">
            <h3 className="map-name capitalize">{mapName}</h3>
            <ScoreTable scores={topScores} formattedTime={formattedTime} />
          </div>
        )
      })}
    </div>
  )
}

export default Leaderboard;
