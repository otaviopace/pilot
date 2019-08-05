import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import qs from 'qs'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import {
  __,
  always,
  anyPass,
  applySpec,
  compose,
  F,
  filter,
  find,
  has,
  head,
  identity,
  ifElse,
  includes,
  invoker,
  isEmpty,
  isNil,
  juxt,
  last,
  map,
  path,
  pipe,
  prop,
  propEq,
  propOr,
  reduce,
  reverse,
  sortBy,
  split,
  splitAt,
  T,
  tail,
  uncurryN,
  unless,
} from 'ramda'
import { Flexbox } from 'former-kit'
import { requestMetrics as requestMetricsAction } from './actions'
import { withError } from '../ErrorBoundary'
import creditCardBrands from '../../models/creditcardBrands'
import dateInputPresets from '../../models/dateSelectorPresets'
import HomeContainer from '../../containers/Home'
import icons from '../../models/icons'
import IndicatorTooltip from '../../components/HomeIndicatorTooltip'
import statusLegends from '../../models/statusLegends'

import { Message } from '../../components/Message'
import GenericErrorIcon from '../Errors/GenericError/Icon.svg'

const mapStateToProps = ({
  account: {
    company,
  },
  home: {
    error,
    loading,
    metrics,
  },
}) => ({
  company,
  error,
  loading,
  metrics,
})

const mapDispatchToProps = {
  requestMetrics: requestMetricsAction,
}

const enhanced = compose(
  translate(),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withError
)

const isNilOrEmpty = anyPass([isNil, isEmpty])

const areDatesEqual = ({ end, start }) => moment(start).isSame(end, 'day')

const momentToISOString = unless(
  isNilOrEmpty,
  pipe(moment, invoker(0, 'toISOString'))
)

const queryDatesToISOString = applySpec({
  dates: {
    end: pipe(prop('end'), momentToISOString),
    start: pipe(prop('start'), momentToISOString),
  },
})

const buildQuery = pipe(
  queryDatesToISOString,
  qs.stringify
)

const stringToMoment = unless(
  isNilOrEmpty,
  moment
)

const queryDatesToMoment = applySpec({
  end: pipe(path(['dates', 'end']), stringToMoment),
  start: pipe(path(['dates', 'start']), stringToMoment),
})

const getDatesFromUrl = unless(
  isNilOrEmpty,
  pipe(
    tail,
    qs.parse,
    queryDatesToMoment
  )
)

const possiblePresets = [7, 15, 30]

const getSelectedPreset = ({ end, start }) => {
  const today = moment()
  const daysDiff = Math.abs(moment(start).diff(moment(end), 'day'))
  if (today.isSame(start, 'day') && today.isSame(end, 'day')) {
    return 'today'
  }
  if (daysDiff <= 1) {
    return 'day'
  }
  if (includes(daysDiff, possiblePresets)) {
    return `days-${daysDiff}`
  }
  return 'custom'
}

const isInvalidDate = property => pipe(
  prop(property),
  isNilOrEmpty
)

const areInvalidDates = ifElse(
  anyPass([
    isInvalidDate('end'),
    isInvalidDate('start'),
  ]),
  T,
  F
)

const updateQuery = (datesRange, replace) => {
  if (datesRange) {
    const queryString = buildQuery(datesRange)
    replace({ search: queryString })
  } else {
    replace('./')
  }
}

const defaultDates = {
  end: moment(),
  start: moment().subtract(7, 'days'),
}

const defaultPreset = 'days-7'

let presets = null

const filterPossiblePresets = filter(
  pipe(
    prop('key'),
    split('-'),
    last,
    Number,
    includes(__, possiblePresets)
  )
)

const getDaysPresetsList = pipe(
  find(propEq('key', 'days')),
  prop('list'),
  filterPossiblePresets
)

const getPresets = (t) => {
  if (presets) {
    return presets
  }
  const dateSelectorPresets = dateInputPresets(t)
  const todayPreset = head(dateSelectorPresets)
  const customPreset = last(dateSelectorPresets)
  const presetList = getDaysPresetsList(dateSelectorPresets)

  presets = [todayPreset, ...presetList, customPreset]

  return presets
}

const getPercentualValueString = uncurryN(2, (value, total) => {
  const percentual = ((value / total) * 100)
  if (percentual % 1 === 0) {
    return `${percentual}%`
  }
  return `${percentual.toFixed(1)}%`
})

const sortIndicatorsData = pipe(
  sortBy(prop('value')),
  reverse
)

const visibleIndicatorsNumber = 2

const getIconByTitle = pipe(
  prop('title'),
  propOr(icons.others, __, icons)
)

const hasIcon = has(__, icons)

const createOhtersTitle = t => indicatorsTitles => (
  <IndicatorTooltip
    t={t}
    indicatorsTitles={indicatorsTitles}
  />
)

const enhanceIndicatorTitle = t => pipe(
  prop('title'),
  ifElse(
    hasIcon,
    title => t(`pages.home.${title}`),
    createOhtersTitle(t)
  )
)

const getOthersIndicatorReducer = (acc, { title, value }) => ({
  icon: creditCardBrands.default.icon,
  title: [...acc.title, { title, value }],
  value: acc.value + value,
})

const createOthersIndicator = reduce(
  getOthersIndicatorReducer,
  {
    title: [],
    value: 0,
  }
)

const groupIndicators = ([indicators, total]) => {
  const sortedIndicators = sortIndicatorsData(indicators)

  if (sortedIndicators.length <= visibleIndicatorsNumber + 1) {
    return [sortedIndicators, total]
  }

  const [visibleIndicators, others] = splitAt(
    visibleIndicatorsNumber,
    sortedIndicators
  )

  if (others.length > 0) {
    const othersIndicator = createOthersIndicator(others)

    return [[...visibleIndicators, othersIndicator], total]
  }

  return [visibleIndicators, total]
}

const enhanceIndicator = uncurryN(3, (totalValue, t) => map(
  applySpec({
    icon: getIconByTitle,
    title: enhanceIndicatorTitle(t),
    value: pipe(
      prop('value'),
      getPercentualValueString(__, totalValue)
    ),
  })
))

const enhanceIndicators = uncurryN(2, t => ifElse(
  isNilOrEmpty,
  always([]),
  pipe(
    juxt([
      identity,
      reduce((acc, indicator) => acc + propOr(0, 'value', indicator), 0),
    ]),
    groupIndicators,
    ([indicators, total]) => enhanceIndicator(total, t, indicators)
  )
))

const getStatusPropBy = (statusProp, property) => pipe(
  prop(property),
  prop(__, statusLegends),
  unless(
    isNilOrEmpty,
    prop(statusProp)
  )
)

const getColorFromStatus = getStatusPropBy('color', 'title')

const getTitleFromStatus = getStatusPropBy('text', 'title')

const enhanceGraphicData = ifElse(
  isNilOrEmpty,
  always([]),
  map(applySpec({
    color: getColorFromStatus,
    label: getTitleFromStatus,
    value: propOr(0, 'value'),
  }))
)

const enhanceGreetingsDescription = (t, { end, start }) => {
  const equalDates = areDatesEqual({ end, start })
  const datesString = equalDates
    ? ` ${moment(start).format('L')}`
    : ` ${moment(start).format('L')} ${t('pages.home.until')} ${moment(end).format('L')}`

  return (
    <span>
      {`${t('pages.home.greeting')} `}
      {equalDates ? t('pages.home.on') : t('pages.home.between')}
      <b>{datesString}</b>
    </span>
  )
}

const Home = ({
  company: {
    name: companyName,
  },
  error,
  history: {
    location: {
      search,
    },
    replace,
  },
  loading,
  metrics,
  requestMetrics,
  t,
}) => {
  const initialSearchDates = getDatesFromUrl(search)
  const [dates, setDates] = useState(search ? initialSearchDates : defaultDates)
  const [preset, setPreset] = useState(defaultPreset)

  const handleDatesChange = (datesRange) => {
    setDates(datesRange)
    updateQuery(datesRange, replace)
  }

  const handleDatesConfirm = (datesRange, newPreset) => {
    setDates(datesRange)
    setPreset(newPreset ? newPreset.key : 'custom')
    updateQuery(datesRange, replace)
  }

  const handleExport = () => {
    console.log('Export') // eslint-disable-line no-console
  }

  /* Start effects */
  useEffect(() => {
    if (search) {
      const searchDates = getDatesFromUrl(search)
      if (!areInvalidDates(searchDates)) {
        requestMetrics(searchDates)
      }
    }
  }, [search, requestMetrics])

  useEffect(() => {
    if (!search) {
      updateQuery(dates, replace)
    }
  }, [dates, search, replace])

  useEffect(() => {
    if (search) {
      const searchDates = getDatesFromUrl(search)
      const newPreset = getSelectedPreset(searchDates)
      setPreset(newPreset)
    }
  }, [search])
  /* End effects */

  const {
    averageAmount = 0,
    cardBrands,
    installments,
    paymentMethods,
    refuseReasons,
    status,
    totalAmount = 0,
    totalTransactions = 0,
    volumeByWeekday,
  } = metrics || {}

  if (error) {
    return (
      <Flexbox
        alignItems="center"
        justifyContent="center"
      >
        <Message
          image={<GenericErrorIcon width={365} height={148} />}
          message={t('pages.home.error_message')}
          title={t('pages.home.error_title')}
        />
      </Flexbox>
    )
  }

  return (
    <HomeContainer
      averageAmount={averageAmount}
      cardBrands={enhanceIndicators(t, cardBrands)}
      dates={dates}
      labels={{
        description: enhanceGreetingsDescription(t, dates),
        greeting: t('pages.home.company_greeting', { companyName }),
      }}
      loading={loading}
      onDateChange={handleDatesChange}
      onDateConfirm={handleDatesConfirm}
      onExport={handleExport}
      paymentMethods={enhanceIndicators(t, paymentMethods)}
      presets={getPresets(t)}
      refuseReasons={enhanceIndicators(t, refuseReasons)}
      selectedPreset={preset}
      t={t}
      totalAmount={totalAmount}
      totalTransactions={totalTransactions}
      totalAmountByWeekday={enhanceGraphicData(volumeByWeekday)}
      transactionsByInstallment={enhanceGraphicData(installments)}
      transactionsByStatus={enhanceGraphicData(status)}
    />
  )
}

const indicatorShape = PropTypes.shape({
  icon: PropTypes.node,
  title: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
})

const graphicDataShape = PropTypes.shape({
  color: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number,
})

Home.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string,
  }),
  error: PropTypes.shape({
    localized: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
    message: PropTypes.string.isRequired,
  }),
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
  loading: PropTypes.shape({
    metrics: PropTypes.bool,
  }),
  metrics: PropTypes.shape({
    averageAmount: PropTypes.number,
    cardBrands: PropTypes.arrayOf(indicatorShape),
    installments: PropTypes.arrayOf(graphicDataShape),
    paymentMethods: PropTypes.arrayOf(indicatorShape),
    refuseReasons: PropTypes.arrayOf(indicatorShape),
    status: PropTypes.arrayOf(graphicDataShape),
    totalAmount: PropTypes.number,
    totalTransactions: PropTypes.number,
  }),
  requestMetrics: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

Home.defaultProps = {
  company: {},
  error: null,
  loading: {},
  metrics: {},
}

export default enhanced(Home)
