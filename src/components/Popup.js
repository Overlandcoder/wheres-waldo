const Popup = props => {
  const handleClick = () => {

  }

  const { time, handleClose } = props;

  return (
    <div className="popup-box">
      <div className="box">
        <div className="popup-header">
          <button className="close-icon" onClick={handleClose}>Close</button>
        </div>
        <div className="popup-content">
          <div className="popup-heading">You found all 4 in <span className="popup-time">{time}</span>!</div>
          <div>Enter your name to submit your score:</div>
          <form>
            <label for="name">Name</label>
            <input type="text" id="name"></input>
            <button type="submit" onClick={handleClick} className="submit-btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Popup;