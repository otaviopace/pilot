import React from 'react'
import PropTypes from 'prop-types'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { identity } from 'ramda'

import sizePropValidation from '../sizePropValidation'

const cursorProps = {
  fillOpacity: 0.15,
}

const MetricBarChart = ({
  data,
  labelFormatter,
  legend,
  styles: {
    barSize = 20,
    colors,
    cursor,
    fontSize = 12,
    gridLines,
    height,
    margin,
    width,
  },
}) => (
  <ResponsiveContainer
    height={height}
    width={width}
  >
    <BarChart
      data={data}
      margin={margin}
    >
      <CartesianGrid
        strokeDasharray={gridLines || '3 3'}
        vertical={false}
      />
      <XAxis
        axisLine={false}
        dataKey="label"
        tick={{
          fontSize,
        }}
        tickLine={false}
        tickMargin={10}
      />
      <YAxis
        axisLine={false}
        label={{
          angle: -90,
          dy: 20,
          fontSize: 14,
          offset: 15,
          position: 'insideBottomLeft',
          value: legend,
        }}
        tick={{
          fontSize,
        }}
        tickLine={false}
        tickMargin={10}
      />
      <Tooltip
        cursor={cursor || cursorProps}
        formatter={value => [value]}
        labelFormatter={labelFormatter}
      />
      <Bar
        barSize={barSize}
        dataKey="value"
        fill={colors.fill}
      />
    </BarChart>
  </ResponsiveContainer>
)

MetricBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      label: PropTypes.string.isRequired,
      legendRenderer: PropTypes.func,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  labelFormatter: PropTypes.func,
  legend: PropTypes.string,
  styles: PropTypes.shape({
    barSize: PropTypes.number,
    colors: PropTypes.shape({
      fill: PropTypes.string.isRequired,
    }).isRequired,
    cursor: PropTypes.object,
    fontSize: PropTypes.number,
    gridLines: PropTypes.string,
    height: sizePropValidation,
    margin: PropTypes.shape({
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number,
      top: PropTypes.number,
    }),
    width: sizePropValidation,
  }).isRequired,
}

MetricBarChart.defaultProps = {
  labelFormatter: identity,
  legend: null,
}

export default MetricBarChart
