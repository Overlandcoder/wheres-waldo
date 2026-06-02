import { useEffect, useState } from "react";
const API_BASE_URL = import.meta.env.PROD
  ? "https://wheres-waldo-production-20b5.up.railway.app"
  : "http://localhost:3000";

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/leaderboard`);
        const data = await response.json();
        setScores(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading) return <p>Loading top scores...</p>;

  return (
    <div className="leaderboard-container">
      <h3>Top 10 Scores</h3>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={score.id}>
              <td>{index + 1}</td>
              <td>{score.playerName}</td>
              <td>
                {Math.floor(score.seconds / 60)
                  .toString()
                  .padStart(2, "0")}
                :{(score.seconds % 60).toString().padStart(2, "0")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
