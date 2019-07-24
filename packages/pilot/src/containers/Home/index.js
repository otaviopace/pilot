import React, {
  Fragment,
} from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Flexbox,
  Grid,
  isMomentPropValidation,
  Row,
} from 'former-kit'

import currencyFormatter from '../../formatters/currencyToParts'
import MetricIndicator from '../../components/MetricIndicator'
import MetricList from '../../components/MetricList'
import MetricChart from '../../components/MetricChart'
import AverageAmountIcon from './icons/average-amount-icon.svg'
import TotalAmountIcon from './icons/total-amount-icon.svg'
import TotalTransactionsIcon from './icons/total-transactions-icon.svg'

import Header from './Header'
import SpacedAmount from './SpacedAmount'

import styles from './style.css'

const HomeContainer = ({
  averageAmount,
  cardBrands,
  dates,
  labels,
  loading,
  onDateConfirm,
  onExport,
  paymentMethods,
  presets,
  refuseReasons,
  selectedPreset,
  t,
  totalAmount,
  totalAmountByWeekday,
  totalTransactions,
  transactionsByInstallment,
  transactionsByStatus,
}) => (
  <Fragment>
    <Header
      dates={dates}
      labels={labels}
      onDateConfirm={onDateConfirm}
      onExport={onExport}
      presets={presets}
      selectedPreset={selectedPreset}
      t={t}
    />
    <Grid className={styles.grid}>
      <Row flex stretch>
        <Col
          desk={3}
          palm={6}
          tablet={6}
          tv={3}
        >
          <Flexbox className={styles.column} direction="column">
            <MetricIndicator
              loading={loading.metrics}
              icon={<AverageAmountIcon />}
              title={t('pages.home.average_amount')}
              value={(
                <SpacedAmount
                  {...currencyFormatter(averageAmount)}
                />
              )}
            />
            <MetricList
              items={paymentMethods}
              loading={loading.metrics}
              title={t('pages.home.payment_methods')}
            />
          </Flexbox>
        </Col>
        <Col
          desk={3}
          palm={6}
          tablet={6}
          tv={3}
        >
          <Flexbox className={styles.column} direction="column">
            <MetricIndicator
              loading={loading.metrics}
              icon={<TotalAmountIcon />}
              title={t('pages.home.total_amount')}
              value={(
                <SpacedAmount
                  {...currencyFormatter(totalAmount)}
                />
              )}
            />
            <MetricList
              items={cardBrands}
              loading={loading.metrics}
              title={t('pages.home.most_used_card_brands')}
            />
          </Flexbox>
        </Col>
        <Col
          desk={3}
          palm={6}
          tablet={6}
          tv={3}
        >
          <Flexbox className={styles.column} direction="column">
            <MetricIndicator
              loading={loading.metrics}
              icon={<TotalTransactionsIcon />}
              title={t('pages.home.total_transactions')}
              value={totalTransactions}
            />
            <MetricList
              loading={loading.metrics}
              title={t('pages.home.refusal_rate')}
              items={refuseReasons}
            />
          </Flexbox>
        </Col>
        <Col
          className={styles.sideColumn}
          desk={3}
          palm={6}
          tablet={6}
          tv={3}
        >
          <MetricChart
            data={transactionsByStatus}
            loading={loading.metrics}
            showLegend
            styles={{
              height: 150,
              innerRadius: 30,
              width: 250,
            }}
            title={t('pages.home.transactions_by_status')}
            type="donut"
          />
        </Col>
      </Row>
      <Row flex stretch>
        <Col
          className={styles.bottomColumn}
          desk={3}
          palm={6}
          tablet={6}
          tv={3}
        >
          <MetricChart
            loading={loading.metrics}
            styles={{
              barSize: 15,
              colors: {
                fill: '#17c9b2',
              },
              fontSize: 11,
              height: 150,
            }}
            type="bar"
            data={transactionsByInstallment}
            labelFormatter={
              installments => t('pages.home.installments', { count: installments })
            }
            title={t('pages.home.transactions_by_installment')}
          />
        </Col>
        <Col
          className={styles.bottomColumn}
          desk={3}
          palm={6}
          tablet={6}
          tv={3}
        >
          <MetricChart
            loading={loading.metrics}
            styles={{
              barSize: 15,
              colors: {
                dot: '#7052c8',
                fill: '#7052c8',
                fontSize: 11,
                line: '#7052c8',
              },
              height: 150,
            }}
            type="area"
            data={totalAmountByWeekday}
            title={t('pages.home.total_amount_by_weekday')}
          />
        </Col>
      </Row>
    </Grid>
  </Fragment>
)

HomeContainer.propTypes = {
  averageAmount: PropTypes.number.isRequired,
  cardBrands: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node.isRequired,
      value: PropTypes.string,
    })
  ).isRequired,
  dates: PropTypes.shape({
    end: isMomentPropValidation,
    start: isMomentPropValidation,
  }).isRequired,
  labels: PropTypes.shape({
    description: PropTypes.node.isRequired,
    greeting: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.shape({
    metrics: PropTypes.bool,
  }),
  onDateConfirm: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
  paymentMethods: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node.isRequired,
      value: PropTypes.string,
    })
  ).isRequired,
  presets: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.func,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  refuseReasons: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node.isRequired,
      value: PropTypes.string,
    })
  ).isRequired,
  selectedPreset: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  totalAmount: PropTypes.number.isRequired,
  totalAmountByWeekday: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number,
    })
  ).isRequired,
  totalTransactions: PropTypes.number.isRequired,
  transactionsByInstallment: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string,
      value: PropTypes.number,
    })
  ).isRequired,
  transactionsByStatus: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string,
      value: PropTypes.number,
    })
  ).isRequired,
}

HomeContainer.defaultProps = {
  loading: {},
}

export default HomeContainer
