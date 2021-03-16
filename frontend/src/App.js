import './App.css';
import React from 'react';
import Result from './Result';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstOption: false,
      secondOption: false,
      thirdOption: false,
      fourthOption: false,
      fifthOption: false,
      submitted: false
    };
    this.handleFirstClick=this.handleFirstClick.bind(this);
    this.handleSecondClick=this.handleSecondClick.bind(this);
    this.handleThirdClick=this.handleThirdClick.bind(this);
    this.handleFourthClick=this.handleFourthClick.bind(this);
    this.handleFifthClick=this.handleFifthClick.bind(this);
    this.getCount=this.getCount.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);

  }
  getCount() {
    let count = 0;
    if (this.state.firstOption) {
      count++;
    }
    if (this.state.secondOption) {
      count++;
    }
    if (this.state.thirdOption) {
      count++;
    }
    if (this.state.fourthOption) {
      count++;
    }
    if (this.state.fifthOption) {
      count++;
    }
    return count;
  }
  handleFirstClick(event) {
    if (this.getCount()<2) {
    this.setState({firstOption: !this.state.firstOption});
    alert("first set to true");
    }
    else if (this.state.firstOption) {
      this.setState({firstOption: false});
      alert("first set to false");
    }
  };
  handleSecondClick(event) {
    if (this.getCount()<2) {
    this.setState({secondOption: !this.state.secondOption});
    alert("second set to true");
    }
    else if (this.state.secondOption) {
      this.setState({secondOption: false});
      alert("second set to false");
    }
  };
  handleThirdClick(event) {
    if (this.getCount()<2) {
    this.setState({thirdOption: !this.state.thirdOption});
    alert("thirdOption set to true");
    }
    else if (this.state.thirdOption) {
      this.setState({thirdOption: false});
      alert("thirdOption set to false");
    }
  };
  handleFourthClick(event) {
    if (this.getCount()<2) {
    this.setState({fourthOption: !this.state.fourthOption});
    alert("fourthOption set to true");
    }
    else if (this.state.fourthOption) {
      this.setState({fourthOption: false});
      alert("fourthOption set to false");
    }
  };
  handleFifthClick(event) {
    if (this.getCount()<2) {
    this.setState({fifthOption: !this.state.fifthOption});
    alert("fifthOption set to true");
    }
    else if (this.state.fifthOption) {
      this.setState({fifthOption: false});
      alert("fifthOption set to false");
    }
  };
  handleSubmit(event) {
    this.setState({submitted: !this.state.submitted});
  }
    render() {
    return (
    <div className="App">
      <header className="App-header">
      {this.state.submitted ?
        <>
        <Result />
        <button className='button back' onClick={this.handleSubmit}> Back </button>
        </>

        :
        <>
        <p>Select Two Options</p>
        <button className='button button1' onClick={this.handleFirstClick}> First Option </button>
        <button className='button button2' onClick={this.handleSecondClick}> Second Option </button>
        <button className='button button3' onClick={this.handleThirdClick}> Third Option </button>
        <button className='button button4' onClick={this.handleFourthClick}> Fourth Option </button>
        <button className='button button5' onClick={this.handleFifthClick}> Fifth Option </button>
        <button className='button submit' onClick={this.handleSubmit}> Submit </button>
        </>
      }
      </header>
    </div>
  );
  }
}

export default App;
