import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
let data = [{
  year: 2000,
  fish: 10,
  CO2: 1
},
{
  year: 2001,
  fish: 8,
  CO2: 3
},
{
  year: 2002,
  fish: 5,
  CO2: 7
},
{
  year: 2003,
  fish: 4,
  CO2: 10
},
{
  year: 2004,
  fish: 3,
  CO2: 15
}


]
class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      firstOption: "co2",
      secondOption: "coral bleaching"
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
  }
  render() {
    let loading = this.state.loading;
    return (

        loading ? <></> :
        <>
      <p> Table </p>
      <LineChart
      width={1100}
      height={600}
      data={this.state.data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis yAxisId="left"
      type="number"
      domain={['dataMin-50', 'dataMax+50']}
      tickFormatter={(value) => parseInt(value)}
       />
      <YAxis yAxisId="right" orientation="right" />
      <Tooltip />
      <Legend />
      <Line
        yAxisId="left"
        type="monotone"
        dataKey="ppm"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line yAxisId="right" type="monotone" dataKey="locs" stroke="#82ca9d" />
    </LineChart>
    </>
    )
  }
}

export default Result;
