import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'former-kit'
import withSpinner from '../withSpinner'

import styles from './style.css'

const enhance = withSpinner(styles.overlay)

const MetricCard = ({ children }) => (
  <div className={styles.metricCard}>
    <Card>
      {children}
    </Card>
  </div>
)

MetricCard.propTypes = {
  children: PropTypes.node.isRequired,
}

export default enhance(MetricCard)
