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
  legend,
  styles: {
    colors,
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
    <AreaChart
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
  legend: PropTypes.string,
  styles: PropTypes.shape({
    colors: PropTypes.shape({
      dot: PropTypes.string.isRequired,
      fill: PropTypes.string.isRequired,
      line: PropTypes.string.isRequired,
    }).isRequired,
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

MetricAreaChart.defaultProps = {
  labelFormatter: identity,
  legend: null,
}

export default MetricAreaChart
