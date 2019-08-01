import React, { Component } from 'react'
import {
  assoc,
  identity,
} from 'ramda'
import {
  action,
} from '@storybook/addon-actions'
import moment from 'moment'

import Section from '../../Section'
import HomeContainer from '../../../src/containers/Home'

import {
  cardBrands,
  paymentMethods,
  presets,
  refuseReasons,
  totalAmountByWeekday,
  transactionsByInstallment,
  transactionsByStatus,
} from './mocks'

const dateConfirmAction = action('onDateConfirm')
const loadingAction = action('onLoadingChange')

const dateConfirmAction = action('onDateConfirm')
const loadingAction = action('onLoadingChange')

class HomeContainerExample extends Component {
  constructor () {
    super()

    this.state = {
      dates: {
        end: moment(),
        start: moment(),
      },
      loading: {
        metrics: false,
      },
      selectedPreset: 'today',
    }

    this.handleDateConfirm = this.handleDateConfirm.bind(this)
    this.handleToggleLoading = this.handleToggleLoading.bind(this)
    this.toggleLoading = this.toggleLoading.bind(this)
  }

  toggleLoading (callback) {
    const {
      loading,
      loading: {
        metrics,
      },
    } = this.state
    loadingAction('loading', !metrics)

    this.setState({
      loading: assoc(['metrics'], !metrics, loading),
    }, callback)
  }

  handleToggleLoading () {
    this.toggleLoading(() => {
      setTimeout(() => {
        this.toggleLoading()
      }, 1000)
    })
  }

  handleDateConfirm (dates, preset) {
    dateConfirmAction(dates, preset)

    this.setState(({ selectedPreset }) => ({
      dates,
      selectedPreset: (preset && preset.key) || selectedPreset,
    }))

    this.handleToggleLoading()
  }

  render () {
    const {
      dates,
      loading,
      selectedPreset,
    } = this.state

    const dateFormat = date => date.format('L')

    return (
      <Section>
        <HomeContainer
          averageAmount={25000}
          cardBrands={cardBrands}
          dates={dates}
          labels={{
            description: `Aqui está o resumo geral da sua conta entre ${dateFormat(dates.start)} à ${dateFormat(dates.end)}`,
            greeting: 'Olá, Saitama!',
          }}
          loading={loading}
          onDateConfirm={this.handleDateConfirm}
          onExport={action('onExport')}
          paymentMethods={paymentMethods}
          presets={presets}
          refuseReasons={refuseReasons}
          selectedPreset={selectedPreset}
          t={identity}
          totalAmount={1070000}
          totalAmountByWeekday={totalAmountByWeekday}
          totalTransactions={1700}
          transactionsByInstallment={transactionsByInstallment}
          transactionsByStatus={transactionsByStatus}
        />
      </Section>
    )
  }
}

export default HomeContainerExample
