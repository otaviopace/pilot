import React from 'react'
import PropTypes from 'prop-types'
import { Legend } from 'former-kit'

import style from './style.css'
import status from '../../models/recipientStatusLegends'

const StatusLegend = ({
  isAcronym,
  item,
  t,
}) => {
  const localePath = isAcronym
    ? 'pages.recipients.status_acronym_of'
    : 'pages.recipients.status_of'

  return (
    <div className={style.centralizedItem}>
      <Legend
        color={status[item.status].color}
        acronym={t(`${localePath}.${item.status}`)}
        hideLabel
      >
        {t(`pages.recipients.status_of.${item.status}`)}
      </Legend>
    </div>
  )
}

StatusLegend.propTypes = {
  isAcronym: PropTypes.bool,
  item: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

StatusLegend.defaultProps = {
  isAcronym: false,
}

export default StatusLegend
