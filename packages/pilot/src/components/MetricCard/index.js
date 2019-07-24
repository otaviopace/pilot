import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  CardTitle,
} from 'former-kit'

import styles from './style.css'

const MetricCard = ({
  icon,
  title,
  value,
}) => (
  <Card>
    <CardTitle title={title} />
    <CardContent>
      <div className={styles.info}>
        <h1 className={styles.value}>{value}</h1>
        <span className={styles.icon}>{icon}</span>
      </div>
    </CardContent>
  </Card>
)

MetricCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
}

export default MetricCard
