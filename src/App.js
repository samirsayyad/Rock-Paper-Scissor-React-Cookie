import React, { Component } from "react";
//import {BrowserRouter} from "react-router-dom"
import Navbar from "./components/Navbar";
import Scoreboard from "./components/ScoreBoard";
import Result from "./components/Result";
import Choices from "./components/Choices";
import rock from "./components/images/rock.png";
import scissor from "./components/images/scissors.png";
import paper from "./components/images/paper.png";
import Cookies from 'js-cookie';

class App extends Component {

  state = {
    images: [
      { id: "rock", image: rock, clicked: false },
      { id: "paper", image: paper, clicked: false },
      { id: "scissor", image: scissor, clicked: false }
    ],
    scores: [{ userscore: parseInt(Cookies.get("userscore"))   || 0 }, 
    { compscore:  parseInt(Cookies.get("compscore")) ||0 }],
    resultimages: [
      { id: "rock", image: rock },
      { id: "paper", image: paper }
    ],
    resultmsg: "welcome"
  };
  getcomputerchoice = () => {
    const choicearray = ["rock", "paper", "scissor"];
    const choice = Math.floor(Math.random() * 3);
    return choicearray[choice];
  };
  getimage = choice => {
    if (choice === "rock") return rock;
    else if (choice === "paper") return paper;
    else if (choice === "scissor") return scissor;
  };
  win = (userchoice, computerchoice) => {
    const images = this.state.images.map(image => {
      if (image.id === userchoice) {
        return { id: image.id, image: image.image, clicked: "choice-green" };
      } else return image;
    });

    const currentuserscore = this.state.scores[0].userscore;
    const currentcompscore = this.state.scores[1].compscore;
    const scores = [
      { userscore: currentuserscore + 1 },
      { compscore: currentcompscore }
    ];

    const resultimages = [
      { id: userchoice, image: this.getimage(userchoice) },
      { id: computerchoice, image: this.getimage(computerchoice) }
    ];
    const resultmsg = "YOU WIN";
    

    this.setState({
      images,
      resultimages,
      scores,
      resultmsg
    } ,()=>{
      Cookies.set("userscore", this.state.scores[0].userscore, {path: "/"});
      Cookies.set("compscore",this.state.scores[1].compscore, {path: "/"});
  
    } )  
    setTimeout(() => {
      const images = this.state.images.map(image => {
        if (image.clicked) {
          return { id: image.id, image: image.image, clicked: false };
        } else return image;
      });
      this.setState({
        images
      });
      //console.log(images)
    }, 400);
    console.log("you win");
  };
  lose = (userchoice, computerchoice) => {
    const images = this.state.images.map(image => {
      if (image.id === userchoice) {
        return { id: image.id, image: image.image, clicked: "choice-red" };
      } else return image;
    });

    const currentuserscore = this.state.scores[0].userscore;
    const currentcompscore = this.state.scores[1].compscore;
    const scores = [
      { userscore: currentuserscore },
      { compscore: currentcompscore + 1 }
    ];

    const resultimages = [
      { id: userchoice, image: this.getimage(userchoice) },
      { id: computerchoice, image: this.getimage(computerchoice) }
    ];
    const resultmsg = "YOU LOSE";
    this.setState({
      images,
      resultimages,
      scores,
      resultmsg
    } ,()=>{
      Cookies.set("userscore", this.state.scores[0].userscore, {path: "/"});
      Cookies.set("compscore",this.state.scores[1].compscore, {path: "/"});
  
    });
    setTimeout(() => {
      const images = this.state.images.map(image => {
        if (image.clicked) {
          return { id: image.id, image: image.image, clicked: false };
        } else return image;
      });
      this.setState({
        images
      });
    }, 400);
    console.log("you lose");
  };
  draw = (userchoice, computerchoice) => {
    //console.log(e.classList)
    const images = this.state.images.map(image => {
      if (image.id === userchoice) {
        return { id: image.id, image: image.image, clicked: "choice-grey" };
      } else return image;
    });

    const resultimages = [
      { id: userchoice, image: this.getimage(userchoice) },
      { id: computerchoice, image: this.getimage(computerchoice) }
    ];
    const resultmsg = "ITS A DRAW";
    this.setState({
      images,
      resultimages,
      resultmsg
    });
    setTimeout(() => {
      const images = this.state.images.map(image => {
        if (image.clicked) {
          return { id: image.id, image: image.image, clicked: false };
        } else return image;
      });
      this.setState({
        images
      });
    }, 400);
    console.log("draw");
  };
  game = userchoice => {
    const computerchoice = this.getcomputerchoice();

    switch (userchoice + computerchoice) {
      case "rockscissor":
      case "scissorpaper":
      case "paperrock":
        this.win(userchoice, computerchoice);
        break;
      case "scissorrock":
      case "paperscissor":
      case "rockpaper":
        this.lose(userchoice, computerchoice);
        break;
      default:
        this.draw(userchoice, computerchoice);
    }
  };
  render() {
    return (
      <div className="app">
        <Navbar />
        <Scoreboard scores={this.state.scores} />
        <Result
          resultimages={this.state.resultimages}
          resultmsg={this.state.resultmsg}
        />
        <Choices choices={this.state.images} game={this.game} />
      </div>
    );
  }
}

export default App;
