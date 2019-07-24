import React from 'react'
import PropTypes from 'prop-types'
import {
  Tooltip,
} from 'former-kit'
import Alert24 from 'emblematic-icons/svg/Alert24.svg'
import IconInfo from 'emblematic-icons/svg/Info32.svg'

import VisaIcon from './icons/visa.svg'
import MastercardIcon from './icons/mastercard.svg'
import OutrosIcon from './icons/outros.svg'
import BankIcon from './icons/bank.svg'
import BoletoIcon from './icons/boleto-icon.svg'
import CreditCardIcon from './icons/credit-card-icon.svg'
import DebitCardIcon from './icons/debit-card-icon.svg'

const LabeledTooltip = ({
  content,
  label,
}) => (
  <span
    style={{
      display: 'flex',
    }}
  >
    <span style={{ marginRight: '5px' }}>{label}</span>
    <Tooltip
      content={content}
      placement="rightMiddle"
    >
      <IconInfo width={16} height={16} />
    </Tooltip>
  </span>
)

LabeledTooltip.propTypes = {
  content: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
}

const cardBrands = [
  {
    icon: <VisaIcon />,
    title: 'Visa',
    value: '60%',
  },
  {
    icon: <MastercardIcon />,
    title: 'Mastercard',
    value: '30%',
  },
  {
    icon: <OutrosIcon />,
    title: (
      <LabeledTooltip
        content={<span>Hiper: 5</span>}
        label="Outros"
      />
    ),
    value: '10%',
  },
]

const paymentMethods = [
  {
    icon: <CreditCardIcon />,
    title: 'Cartão de crédito',
    value: '60%',
  },
  {
    icon: <DebitCardIcon />,
    title: 'Cartão de débito',
    value: '30%',
  },
  {
    icon: <BoletoIcon />,
    title: 'Boleto',
    value: '10%',
  },
]

const refuseReasons = [
  {
    icon: <BankIcon />,
    title: 'Banco emissor',
    value: '99%',
  },
  {
    icon: <Alert24 width={12} height={12} stroke="red" />,
    title: 'Antifraude',
    value: '1%',
  },
]

const transactionsByInstallment = [
  {
    label: '1',
    value: 31,
  },
  {
    label: '2',
    value: 37,
  },
  {
    label: '3',
    value: 39,
  },
  {
    label: '4',
    value: 27,
  },
  {
    label: '5',
    value: 30,
  },
  {
    label: '6',
    value: 50,
  },
  {
    label: '7',
    value: 35,
  },
  {
    label: '8',
    value: 31,
  },
  {
    label: '9',
    value: 26,
  },
  {
    label: '10',
    value: 29,
  },
  {
    label: '11',
    value: 19,
  },
  {
    label: '12',
    value: 54,
  },
]

const transactionsByStatus = [
  {
    color: '#17c9b2',
    label: 'Aprovadas',
    value: 1150,
  },
  {
    color: '#0b6e69',
    label: 'Aguardando pgto',
    value: 240,
  },
  {
    color: '#613fc7',
    label: 'Estornadas',
    value: 200,
  },
  {
    color: '#da272c',
    label: 'Recusadas',
    value: 100,
  },
  {
    color: '#070606',
    label: 'Outros',
    legendRenderer: label => (
      <LabeledTooltip
        content={<span>Chargeback: 2</span>}
        label={label}
      />
    ),
    value: 10,
  },
]

const totalAmountByWeekday = [
  {
    label: 'DOM',
    value: 15,
  },
  {
    label: 'SEG',
    value: 50,
  },
  {
    label: 'TER',
    value: 30,
  },
  {
    label: 'QUA',
    value: 35,
  },
  {
    label: 'QUI',
    value: 28,
  },
  {
    label: 'SEX',
    value: 48,
  },
  {
    label: 'SÁB',
    value: 36,
  },
]

const presets = [
  {
    date: () => null,
    key: 'custom',
    label: 'Personalizado',
  },
  {
    date: () => 0,
    key: 'today',
    label: 'Hoje',
  },
  {
    date: () => -7,
    key: '7-days',
    label: '7 Dias',
  },
  {
    date: () => -15,
    key: '15-days',
    label: '15 Dias',
  },
  {
    date: () => -30,
    key: '30-days',
    label: '30 Dias',
  },
]

export {
  cardBrands,
  paymentMethods,
  presets,
  refuseReasons,
  totalAmountByWeekday,
  transactionsByInstallment,
  transactionsByStatus,
}
