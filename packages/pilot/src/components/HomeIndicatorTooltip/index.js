import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'former-kit'
import IconInfo from 'emblematic-icons/svg/Info32.svg'
import {
  is,
  map,
} from 'ramda'
import styles from './style.css'

const IndicatorTooltip = ({
  indicatorsTitles,
  t,
}) => (
  <span className={styles.content}>
    <span className={styles.label}>{t('pages.home.others')}</span>
    <Tooltip
      content={(
        <span className={styles.tooltip}>
          {is(Array, indicatorsTitles)
            && map(({ title, value }) => {
              const translationBase = 'pages.home.'
              let translation = t(`${translationBase}${title}`)
              translation = translation.indexOf(translationBase) > -1
                ? title
                : translation

              return (
                <div
                  key={title}
                  className={styles.title}
                >
                  {`${translation}: `}
                  <b>{value}</b>
                </div>
              )
            }, indicatorsTitles)
          }
          {!is(Array, indicatorsTitles) && indicatorsTitles}
        </span>
      )}
      placement="rightMiddle"
    >
      <IconInfo width={16} height={16} />
    </Tooltip>
  </span>
)

IndicatorTooltip.propTypes = {
  indicatorsTitles: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
  t: PropTypes.func.isRequired,
}

IndicatorTooltip.defaultProps = {
  indicatorsTitles: '',
}

export default IndicatorTooltip
