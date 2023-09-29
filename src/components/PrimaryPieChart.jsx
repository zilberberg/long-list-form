import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = [
  "#E57373",
  "#FFD54F",
  "#64B5F6",
  "#81C784",
  "#FF8A65",
  "#FFD54F",
  "#4DB6AC",
  "#FFAB40",
  "#9575CD",
  "#4FC3F7",
  "#AED581",
  "#FFD740"
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class PrimaryPieChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={this.props.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(props) => renderCustomizedLabel(props, this.props.data)}
            outerRadius={200}
            fill="#8884d8"
            dataKey="value"
            innerRadius={100}
          >
            {this.props.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" height={86} iconSize={20} iconType={'circle'}/>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}