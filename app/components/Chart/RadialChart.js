import React from 'react';
import PropTypes from 'prop-types';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

const RadiaChart = ({ data }) => (
  <div className="scatter-chart-section">
    <ResponsiveContainer
      minHeight="290px"
    >
      <RadarChart outerRadius={105} data={data}>
        <PolarGrid />
        <Tooltip />
        <PolarAngleAxis
          dataKey="subject"
          // tick={<CustomizedAxisTick />}
          tick={
          {
            fill: 'white',
            opacity: 0.7,
            fontFamily: 'Lato',
            fontSize: '14px',
            maxWidth: '20px'
          }
          }
        />
        <Radar name="Expectation" dataKey="expectedScore" stroke="#0B7AB2" fill="#0B7AB2" fillOpacity={0.9} />
        <Radar name="Actual" dataKey="actualScore" stroke="#7CAF67" fill="#7CAF67" fillOpacity={0.9} />
      </RadarChart>
    </ResponsiveContainer>
  </div>
);

RadiaChart.propTypes = {
  data: PropTypes.array.isRequired
};

export default RadiaChart;
