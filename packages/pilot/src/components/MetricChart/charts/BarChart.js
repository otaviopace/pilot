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
  styles: {
    barSize,
    colors,
    cursor,
    fontSize,
    gridLines,
    height,
    width,
  },
}) => (
  <ResponsiveContainer
    height={height}
    width={width}
  >
    <BarChart data={data}>
      <CartesianGrid
        strokeDasharray={gridLines || '3 3'}
        vertical={false}
      />
      <XAxis
        axisLine={false}
        dataKey="label"
        tick={{
          fontSize: fontSize || 12,
        }}
        tickLine={false}
        tickMargin={10}
      />
      <YAxis
        axisLine={false}
        tick={{
          fontSize: fontSize || 12,
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
        barSize={barSize || 20}
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
  styles: PropTypes.shape({
    barSize: PropTypes.number,
    colors: PropTypes.shape({
      fill: PropTypes.string.isRequired,
    }).isRequired,
    cursor: PropTypes.object,
    fontSize: PropTypes.number,
    gridLines: PropTypes.string,
    height: sizePropValidation,
    width: sizePropValidation,
  }).isRequired,
}

MetricBarChart.defaultProps = {
  labelFormatter: identity,
}

export default MetricBarChart
