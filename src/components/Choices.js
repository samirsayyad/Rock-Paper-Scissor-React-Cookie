import React from "react";

class Choices extends React.Component {
  render() {
    const { choices } = this.props;

    //console.log(this.props)
    //console.log(choices)
    const choicelist = choices.map(choice => {
      const clickstate = choice.clicked;
      var classname = clickstate ? clickstate : "choice";
      return (
        <div
          className={classname}
          id={choice.id}
          role="button"
          tabIndex="0"
          key={choice.id}
          onClick={() => this.props.game(choice.id)}
          onKeyDown={() => this.props.game(choice.id)}
        >
          <img src={choice.image} alt={choice.id} height="100" />
        </div>
      );
    });
    return <div className="choices">{choicelist}</div>;
  }
}

export default Choices;
