import React from 'react'
import PropTypes from 'prop-types'
import {
  CardContent,
  CardTitle,
} from 'former-kit'
import MetricCard from '../MetricCard'
import styles from './style.css'

const MetricIndicator = ({
  icon,
  loading,
  title,
  value,
}) => (
  <MetricCard loading={loading}>
    <CardTitle title={title} />
    <CardContent>
      <div className={styles.info}>
        <h1 className={styles.value}>{value}</h1>
        <span className={styles.icon}>{icon}</span>
      </div>
    </CardContent>
  </MetricCard>
)

MetricIndicator.propTypes = {
  icon: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
}

MetricIndicator.defaultProps = {
  loading: false,
}

export default MetricIndicator
