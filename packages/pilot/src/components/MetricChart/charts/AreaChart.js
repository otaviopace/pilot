import React from 'react'
import PropTypes from 'prop-types'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { identity } from 'ramda'

import sizePropValidation from '../sizePropValidation'

const MetricAreaChart = ({
  data,
  labelFormatter,
  styles: {
    colors,
    fontSize = 12,
    gridLines,
    height,
    width,
  },
}) => (
  <ResponsiveContainer
    height={height}
    width={width}
  >
    <AreaChart data={data}>
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
        tick={{
          fontSize,
        }}
        tickLine={false}
        tickMargin={10}
      />
      <Tooltip
        formatter={value => [value]}
        labelFormatter={labelFormatter}
      />
      <Area
        dataKey="value"
        dot={{
          fill: colors.dot,
          fillOpacity: 1,
          r: 5,
          stroke: colors.stroke || '#fff',
          strokeWidth: 2,
        }}
        fill={colors.fill}
        fillOpacity={0.13}
        stroke={colors.line}
        strokeWidth={2}
      />
    </AreaChart>
  </ResponsiveContainer>
)

MetricAreaChart.propTypes = {
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
    colors: PropTypes.shape({
      dot: PropTypes.string.isRequired,
      fill: PropTypes.string.isRequired,
      line: PropTypes.string.isRequired,
    }).isRequired,
    gridLines: PropTypes.string,
    height: sizePropValidation,
    width: sizePropValidation,
  }).isRequired,
}

MetricAreaChart.defaultProps = {
  labelFormatter: identity,
}

export default MetricAreaChart
