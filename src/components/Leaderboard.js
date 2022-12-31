import { useEffect, useState } from "react";
import ScoreTable from "./ScoreTable";

const Leaderboard = props => {
  const topAmount = 10;
  const [topScores, setTopScores] = useState(undefined);

  useEffect(() => {
    const getTopScores = async () => {
      const response = await fetch(`http://localhost:3000/api/top_scores?&amount=${topAmount}`);
      const data = await response.json();
      console.log(data)
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
              : null}
          </div>
        )
      })}
    </div>
  )
}

export default Leaderboard;
