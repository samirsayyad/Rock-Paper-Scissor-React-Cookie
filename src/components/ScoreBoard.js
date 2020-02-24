import React from "react";

class Scoreboard extends React.Component {
  render() {
    const { scores , mode } = this.props;
    return (
      <div className="scoreboard">
          {(mode) ? <div id="user-label" className="badge">User</div>:
           <div id="user-comp-label" className="badge">Computer1</div> } 

        
        <div id="comp-label" className="badge">
         {(mode) ?  "Computer" : "Computer2"}
        </div>
        <div id="reset-button" className="resetBadge" onClick={() =>
                  window.confirm("Are you sure you wish to reset game?") && this.props.resetGame()}>
          Restart
        </div>
        <div id="mode-button" className="resetBadge" onClick={() =>
                  window.confirm("Are you sure you wish to change game mode?") && this.props.changeGameMode()}>
          Change Mode
        </div>
        <span id="user-score">{scores[0].userscore}</span>:
        <span id="comp-score">{scores[1].compscore}</span>
      </div>
    );
  }
}
export default Scoreboard;
