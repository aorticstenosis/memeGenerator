import React from "react";
import "../App.css";

class MemeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "i don't know her ",
      randomImg:
        "https://upload.wikimedia.org/wikipedia/commons/9/93/Mariah_Carey_WBLS_2018_Interview_2.jpg",
      allimage: [],
    };
  }
  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;

        this.setState({ allimage: memes });
      });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const randNum = Math.floor(Math.random() * this.state.allimage.length);

    const randMemeImg = this.state.allimage[randNum].url;
    console.log(randMemeImg);
    this.setState({ randomImg: randMemeImg });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div>
        <form
          className="meme-form"
          style={{ alignItems: "center" }}
          onSubmit={this.handleSubmit}
        >
          <input
            name="topText"
            type="text"
            placeholder="Top Text"
            value={this.state.topText}
            onChange={this.handleChange}
          />
          <input
            name="bottomText"
            type="text"
            placeholder="Bottom Text"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />
          <button>Gen</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImg} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}
export default MemeGenerator;
