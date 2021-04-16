import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      firstOption: "co2",
      secondOption: "coral bleaching",
      thirdOption: "Weather Anomalies",
      fourthOption: "Temperature"
    };
  }
  componentDidMount() {
    if (this.props.options.firstOption && this.props.options.secondOption) {

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("http://127.0.0.1:5000/co2/coral_bleaching", requestOptions)
        .then(response => response.json())
        .then(result => this.setState({data : result.data, loading:false}))
        .catch(error => console.log('error', error));
    }
    else if (this.props.options.firstOption && this.props.options.thirdOption) {

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("http://127.0.0.1:5000/co2/weather_anomalies2", requestOptions)
        .then(response => response.json())
        .then(result => this.setState({data : result.data, loading:false}))
        .catch(error => console.log('error', error));
    }
    else if (this.props.options.secondOption && this.props.options.thirdOption) {

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("http://127.0.0.1:5000/coral_bleaching/weather_anomalies2", requestOptions)
        .then(response => response.json())
        .then(result => this.setState({data : result.data, loading:false}))
        .catch(error => console.log('error', error));
    }
    else if (this.props.options.firstOption && this.props.options.fourthOption) {

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("http://127.0.0.1:5000/co2/temperature", requestOptions)
        .then(response => response.json())
        .then(result => this.setState({data : result.data, loading:false}))
        .catch(error => console.log('error', error));
    }
    else if (this.props.options.secondOption && this.props.options.fourthOption) {

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("http://127.0.0.1:5000/coral_bleaching/temperature", requestOptions)
        .then(response => response.json())
        .then(result => this.setState({data : result.data, loading:false}))
        .catch(error => console.log('error', error));
    }
    else if (this.props.options.thirdOption && this.props.options.fourthOption) {

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("http://127.0.0.1:5000/weather_anomalies2/temperature", requestOptions)
        .then(response => response.json())
        .then(result => this.setState({data : result.data, loading:false}))
        .catch(error => console.log('error', error));
    }
    else if (this.props.options.firstOption && this.props.options.fifthOption) {

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("http://127.0.0.1:5000/co2/fish", requestOptions)
        .then(response => response.json())
        .then(result => this.setState({data : result.data, loading:false}))
        .catch(error => console.log('error', error));
    }
    else if (this.props.options.secondOption && this.props.options.fifthOption) {

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("http://127.0.0.1:5000/coral_bleaching/fish", requestOptions)
        .then(response => response.json())
        .then(result => this.setState({data : result.data, loading:false}))
        .catch(error => console.log('error', error));
    }
    else if (this.props.options.thirdOption && this.props.options.fifthOption) {

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("http://127.0.0.1:5000/weather_anomalies/fish", requestOptions)
        .then(response => response.json())
        .then(result => this.setState({data : result.data, loading:false}))
        .catch(error => console.log('error', error));
    }
    else if (this.props.options.fourthOption && this.props.options.fifthOption) {

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("http://127.0.0.1:5000/temperature/fish", requestOptions)
        .then(response => response.json())
        .then(result => this.setState({data : result.data, loading:false}))
        .catch(error => console.log('error', error));
    }
  }
  render() {
    let loading = this.state.loading;
    return (

        loading ? <></> :
        <>
      <p> Your Visualization </p>
      <div className="inline">
      <div className="left">
      <p>
      {Object.keys(this.state.data[0])[0]}
      </p>
      </div>
      <div className={"center"}>
      <ResponsiveContainer width="100%" height={600}>
      <LineChart
      data={this.state.data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" fill={"white"}/>
      <XAxis dataKey="year"
      interval={2}
      label={{value: "Year", position: "bottom", offset: -90}}
      />
      <YAxis yAxisId="left"
      type="number"
      domain={['dataMin-(.2*dataMin)', 'dataMax+(.2*dataMax)']}
      tickFormatter={(value) => parseInt(value)}
       />
      <YAxis yAxisId="right" orientation="right"
      domain={['dataMin-(.2*dataMin)', 'dataMax+(.2*dataMax)']}
      tickFormatter={(value) => parseInt(value)}
      type="number"

      />
      <Tooltip />
      <Legend />
      <Line
        yAxisId="left"
        type="monotone"
        dataKey={Object.keys(this.state.data[0])[0]}
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line yAxisId="right" type="monotone" dataKey={Object.keys(this.state.data[0])[1]} stroke="#82ca9d" />
    </LineChart>
    </ResponsiveContainer>
    </div>
    <div className="right">
    <p>
    {Object.keys(this.state.data[0])[1]}
    </p>
    </div>
    </div>
    </>
    )
  }
}

export default Result;
