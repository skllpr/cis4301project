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
      submitted: false,
      loaded: false
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
      <div className="Home">
        <h1> Visualizing Pollution Effects </h1>
      {this.state.submitted ?
        <>
        <Result options={this.state}/>
        <button className='button back' onClick={this.handleSubmit}> Back </button>
        </>

        :
        <>
        <p>Select Two Options</p>
        <button className={this.state.firstOption ? 'button ns' : 'button s'} onClick={this.handleFirstClick}> CO2 </button>
        <button className={this.state.secondOption ? 'button ns' : 'button s'} onClick={this.handleSecondClick}> Coral Bleaching </button>
        <button className={this.state.thirdOption ? 'button ns' : 'button s'} onClick={this.handleThirdClick}> Weather Anomalies </button>
        <button className={this.state.fourthOption ? 'button ns' : 'button s'} onClick={this.handleFourthClick}> Temperature </button>
        <button className={this.state.fifthOption ? 'button ns' : 'button s'} onClick={this.handleFifthClick}> Fifth Option </button>
        <button className='button submit' onClick={this.handleSubmit}> Submit </button>
        </>
      }
      </div>
  );
  }
}

export default App;
