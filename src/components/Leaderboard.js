import { useEffect, useState } from "react";
import ScoreTable from "./ScoreTable";

const Leaderboard = props => {
  const topAmount = 10;
  const [topScores, setTopScores] = useState(undefined);

  useEffect(() => {
    const getTopScores = async () => {
      const response = await fetch(`https://wheres-waldo-service.onrender.com/api/top_scores?&amount=${topAmount}`);
      const data = await response.json();
      setTopScores(data.top_scores);
    }

    getTopScores();
  }, []);

  const { maps, formattedTime } = props;

  return (
    <div className="leaderboard">
      <h1 className="border-bottom-yellow">Top {topAmount} Scores</h1>
      {maps.map((map, index) => {
        return (
          <div key={index} className="text-center">
            <h3 className="map-name capitalize">{map.name}</h3>
            {topScores ?
              <ScoreTable scores={topScores[map.name]} formattedTime={formattedTime} />
              :
              <ScoreTable scores={null} formattedTime={formattedTime} />
              }
          </div>
        )
      })}
    </div>
  )
}

export default Leaderboard;
