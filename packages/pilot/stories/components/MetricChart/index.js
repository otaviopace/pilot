import React from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Grid,
  Row,
} from 'former-kit'
import { identity } from 'ramda'

import Section from '../../Section'

import {
  transactionsByInstallment,
  transactionsByStatus,
} from './data'
import MetricChart from '../../../src/components/MetricChart'

const Chart = ({
  data,
  labelFormatter,
  showLegend,
  styles,
  title,
  type,
}) => (
  <div style={{ width: '100%' }}>
    <MetricChart
      styles={styles}
      type={type}
      labelFormatter={labelFormatter}
      showLegend={showLegend}
      title={title}
      data={data}
    />
  </div>
)

const installmentsLabel = installment => (installment > 1
  ? `${installment} parcelas`
  : `${installment} parcela`
)

const MetricChartExample = () => (
  <Section>
    <Grid>
      <Row flex>
        <Col>
          <Chart
            styles={{
              colors: {
                fill: '#17c9b2',
              },
              height: 200,
            }}
            data={transactionsByInstallment}
            labelFormatter={installmentsLabel}
            title="Bar chart"
            type="bar"
          />
        </Col>
      </Row>
      <Row flex>
        <Col>
          <Chart
            styles={{
              colors: {
                dot: '#7052c8',
                fill: '#7052c8',
                line: '#7052c8',
              },
              height: 200,
            }}
            data={transactionsByStatus}
            title="Area chart"
            type="area"
          />
        </Col>
      </Row>
      <Row flex>
        <Col>
          <Chart
            styles={{
              height: 200,
              innerRadius: 50,
            }}
            data={transactionsByStatus}
            showLegend
            title="Pie chart"
            type="donut"
          />
        </Col>
      </Row>
      <Row flex>
        <Col>
          <Chart
            styles={{
              height: 200,
            }}
            data={transactionsByStatus}
            showLegend
            title="Pizza chart"
            type="pizza"
          />
        </Col>
      </Row>
    </Grid>
  </Section>
)

Chart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      label: PropTypes.string.isRequired,
      legendRenderer: PropTypes.func,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  labelFormatter: PropTypes.func,
  showLegend: PropTypes.bool,
  styles: PropTypes.shape({
    colors: PropTypes.object,
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'area', 'bar', 'donut', 'pizza',
  ]).isRequired,
}

Chart.defaultProps = {
  labelFormatter: identity,
  showLegend: false,
}

export default MetricChartExample
