import React from 'react'
import Card from 'emblematic-icons/svg/Card32.svg'
import VisaIcon from './visa.svg'
import MastercardIcon from './mastercard.svg'
import OutrosIcon from './outros.svg'
import CreditCardIcon from './credit-card.svg'
import DebitCardIcon from './debit-card.svg'
import BoletoIcon from './boleto.svg'
import AlertIcon from './alert.svg'
import BankIcon from './bank.svg'

const icons = {
  acquirer: <BankIcon />,
  acquirer_timeout: <AlertIcon />,
  antifraud: <AlertIcon />,
  boleto: <BoletoIcon />,
  capture_timeout: <AlertIcon />,
  credit_card: <CreditCardIcon />,
  debit_card: <DebitCardIcon />,
  internal_error: <AlertIcon />,
  invalid_capture_amount: <AlertIcon />,
  manual_review: <AlertIcon />,
  manual_review_timeout: <AlertIcon />,
  mastercard: <MastercardIcon />,
  no_acquirer: <AlertIcon />,
  others: <OutrosIcon />,
  unknown: <Card width={16} height={16} />,
  visa: <VisaIcon />,
}

export default icons
