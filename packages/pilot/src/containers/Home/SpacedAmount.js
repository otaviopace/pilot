import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Spacing } from 'former-kit'

const SpacedAmount = ({ symbol, value }) => (
  <Fragment>
    <span>{symbol}</span>
    <Spacing />
    {value}
  </Fragment>
)

SpacedAmount.propTypes = {
  symbol: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
}

export default SpacedAmount
