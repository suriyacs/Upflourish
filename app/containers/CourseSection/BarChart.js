import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const BarGraph = ({ barChartData }) => (
  <Fragment>
    <div className="bar-chart-section">
      <ResponsiveContainer
        minHeight="300px"
        maxHeight="900px"
      >
        <BarChart
          width={650}
          height={450}
          data={barChartData}
          layout="vertical"
          barSize={15}
          margin={
                    {
                      top: 5, right: 30, left: 0, bottom: 0
                    }
                  }
          label={{ fill: 'red', fontSize: 20 }}
        >
          <CartesianGrid horizontal={false} />
          <XAxis hide id="xaxis" type="number" axisLine={false} />
          <YAxis width={120} type="category" dataKey="name" />
          <Tooltip />
          <Legend verticalAlign="top" height={36} iconType="circle" />
          <Bar dataKey="0-4 years" stackId="a" fill="#009EE7" />
          <Bar dataKey="4-8 years" stackId="a" fill="#30E3DD" />
          <Bar dataKey="4-8 years" stackId="a" fill="#132D5E" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </Fragment>
);

BarGraph.propTypes = {
  barChartData: PropTypes.array.isRequired
};

export default BarGraph;
