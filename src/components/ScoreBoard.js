import React from "react";

class Scoreboard extends React.Component {
  render() {
    const { scores } = this.props;
    return (
      <div className="scoreboard">
        <div id="user-label" className="badge">
          user
        </div>
        <div id="comp-label" className="badge">
          computer
        </div>
        <span id="user-score">{scores[0].userscore}</span>:
        <span id="comp-score">{scores[1].compscore}</span>
      </div>
    );
  }
}
export default Scoreboard;
