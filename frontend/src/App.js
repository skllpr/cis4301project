import './App.css';
import React from 'react';
import Result from './Result';
import ParticlesBg from 'particles-bg'

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
    this.handleCount=this.handleCount.bind(this);
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
    }
    else if (this.state.firstOption) {
      this.setState({firstOption: false});
    }
  };
  handleSecondClick(event) {
    if (this.getCount()<2) {
    this.setState({secondOption: !this.state.secondOption});
    }
    else if (this.state.secondOption) {
      this.setState({secondOption: false});
    }
  };
  handleThirdClick(event) {
    if (this.getCount()<2) {
    this.setState({thirdOption: !this.state.thirdOption});
    }
    else if (this.state.thirdOption) {
      this.setState({thirdOption: false});
    }
  };
  handleCount(event) {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:5000/count", requestOptions)
      .then(response => response.json())
      .then(result => alert(result.data + " tuples in the database. The SQL command run is: \n select Sum(Column) From \n ((select Count(*) as Column From KBARREDO.CO2) \n union (select Count(*) as Column From EDISONXIE.Weather_Anomalies2) \n union (select Count(*) as Column From EDISONXIE.Global_Temperatures) \n union (select Count(*) as Column From KBARREDO.Coral_Bleaching));"))
      .catch(error => console.log('error', error));
  };
  handleFourthClick(event) {
    if (this.getCount()<2) {
    this.setState({fourthOption: !this.state.fourthOption});
    }
    else if (this.state.fourthOption) {
      this.setState({fourthOption: false});
    }
  };
  handleFifthClick(event) {
    if (this.getCount()<2) {
    this.setState({fifthOption: !this.state.fifthOption});
    }
    else if (this.state.fifthOption) {
      this.setState({fifthOption: false});
    }
  };
  handleSubmit(event) {
    if (this.getCount()<2) {
      alert("Please select 2 options.");
    }
    else {
    this.setState({submitted: !this.state.submitted});
  }
  }
    render() {
    return (
      <div className="Home">
      <ParticlesBg color="#906ce0" num={1} type="cobweb" bg={true} />

        <h1 className="title"> Visualizing Pollution Effects </h1>
      {this.state.submitted ?
        <>
        <Result options={this.state}/>
        <button className='button back' onClick={this.handleSubmit}> Back </button>
        </>

        :
        <>
        <p className={"intro"}>
        Humanity faces many threats, but none is greater than climate change. In damaging our climate, we are becoming the architects of our own destruction. By 2080, if nothing is done to reduce the amount of Carbon Dioxide being pumped into the atmosphere, the climate change will be irreversible. To help raise awareness about the effects of Global Warming, our group decided to create a software that not only help users visualize the trends, but also analyze how one trend affects another. This is done by allowing the users to select two different impacts and then sending the query to the backend to retrieve the data. The data is then displayed on a line graph. We really hope that our project can bring about positive change and awareness to the ever-increasing threat of climate change.
        </p>
        <p className={"details"}>Select Two Options</p>
        <div>
        <button className={this.state.firstOption ? 'button s' : 'button ns'} onClick={this.handleFirstClick}> CO2 </button>
        </div>
        <div>
        <button className={this.state.secondOption ? 'button s' : 'button ns'} onClick={this.handleSecondClick}> Coral Bleaching </button>
        </div>
        <div>
        <button className={this.state.thirdOption ? 'button s' : 'button ns'} onClick={this.handleThirdClick}> Weather Anomalies </button>
        </div>
        <div>
        <button className={this.state.fourthOption ? 'button s' : 'button ns'} onClick={this.handleFourthClick}> Temperature </button>
        </div>
        {/*<div>
        <button className={this.state.fifthOption ? 'button s' : 'button ns'} onClick={this.handleFifthClick}> Fifth Option </button>
        </div>*/}
        <div>
        <button className='button submit' onClick={this.handleSubmit}> Submit </button>
        </div>
        <div>
        <button className='button submit' onClick={this.handleCount}> Tuple Count </button>
        </div>
        </>
      }
      </div>
  );
  }
}

export default App;
