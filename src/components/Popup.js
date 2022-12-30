import { Link } from "react-router-dom";

const Popup = props => {
  const { time, handleClose, handleChange, saveScore, scoreSubmitted } = props;

  const handleClick = event => {
    event.preventDefault();
    saveScore();
  }

  return (
    <div className="popup-box">
      <div className="box">
        <div className="popup-header">
          <button className="close-icon" onClick={handleClose}>Close</button>
        </div>
        <div className="popup-content">
          <div className="popup-heading">
            You found all 4 in <span className="popup-time">{time}</span>
          </div>
          {scoreSubmitted ?
            <div>
              <div className="text-center">Score submitted.</div>
              <Link className="" to="/leaderboard">
                <button className="green-btn">View Leaderboard</button>
              </Link>
            </div>
            :
            <div>
              <div className="form-prompt">Enter your name to submit your score:</div>
              <form>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" onChange={handleChange}></input>
                <button type="submit" onClick={handleClick} className="green-btn">Submit</button>
              </form>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Popup;