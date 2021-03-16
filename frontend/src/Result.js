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
      firstOption: false,
      secondOption: false,
      thirdOption: false,
      fourthOption: false,
      fifthOption: false,
      submitted: false
    };
  }
  render() {
    return (
      <>
      <p> Table </p>
      <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis yAxisId="left" />
      <YAxis yAxisId="right" orientation="right" />
      <Tooltip />
      <Legend />
      <Line
        yAxisId="left"
        type="monotone"
        dataKey="fish"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line yAxisId="right" type="monotone" dataKey="CO2" stroke="#82ca9d" />
    </LineChart>
    </>
    )
  }
}

export default Result;
