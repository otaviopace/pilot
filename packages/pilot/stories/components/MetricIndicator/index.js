import React from 'react'

import Section from '../../Section'
import MetricIndicator from '../../../src/components/MetricIndicator'
import Icon from './line-chart-icon.svg'

const MetricIndicatorExample = () => (
  <Section>
    <MetricIndicator
      icon={<Icon />}
      title="Ticket médio"
      value="R$ 250,00"
    />
  </Section>
)

export default MetricIndicatorExample
