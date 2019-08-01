import React from 'react'
import PropTypes from 'prop-types'
import {
  CardTitle,
  CardContent,
} from 'former-kit'
import MetricCard from '../MetricCard'
import List from './List'

import styles from './style.css'

const MetricList = ({
  items,
  loading,
  title,
}) => (
  <MetricCard loading={loading}>
    <CardTitle title={title} />
    <CardContent className={styles.list}>
      <List items={items} />
    </CardContent>
  </MetricCard>
)

MetricList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape(List.propTypes.items)
  ).isRequired,
  loading: PropTypes.bool,
  title: PropTypes.string.isRequired,
}

MetricList.defaultProps = {
  loading: false,
}

export default MetricList
