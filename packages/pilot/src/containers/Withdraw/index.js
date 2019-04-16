import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Button,
  Card,
  CardContent,
  Col,
  Flexbox,
  Grid,
  Row,
  Steps,
} from 'former-kit'
import {
  assoc,
  identity,
  ifElse,
  isNil,
  map,
  pipe,
  propEq,
  toPairs,
} from 'ramda'
import DetailsHead from '../../components/DetailsHead'
import formatAccountType from '../../formatters/accountType'
import formatAgencyAccount from '../../formatters/agencyAccount'
import formatCpfCnpj from '../../formatters/cpfCnpj'
import WithdrawForm from './Form'
import WithdrawConfirmation from './Confirmation'
import WithdrawResult from './Result'
import { Message, MessageActions } from '../../components/Message'
import EmptyStateIcon from './EmptyStateIcon.svg'

const createStepsStatus = pipe(
  toPairs,
  map(item => ({
    id: item[0],
    status: item[1],
  }))
)

const setCurrentStep = currentStep => ifElse(
  propEq('id', currentStep),
  assoc('status', 'current'),
  identity
)

const buildEmptyState = (onCancel, t) => (
  <Flexbox
    alignItems="center"
    direction="column"
  >
    <Message
      image={<EmptyStateIcon width={365} height={148} />}
      message={t('pages.withdraw.no_available_limits')}
    >
      <MessageActions>
        <Button
          fill="gradient"
          onClick={onCancel}
        >
          {t('pages.withdraw.back_to_balance')}
        </Button>
      </MessageActions>
    </Message>
  </Flexbox>
)

class Withdraw extends Component {
  constructor () {
    super()

    this.getStepsStatus = this.getStepsStatus.bind(this)
    this.renderCurrentStep = this.renderCurrentStep.bind(this)
    this.renderDataStep = this.renderDataStep.bind(this)
    this.renderRecipient = this.renderRecipient.bind(this)
    this.renderWithdrawForm = this.renderWithdrawForm.bind(this)
  }

  getStepsStatus () {
    const { currentStep, stepsStatus } = this.props
    const steps = createStepsStatus(stepsStatus)

    return map(setCurrentStep(currentStep), steps)
  }

  renderRecipient () {
    const {
      recipient: {
        bank_account: {
          agencia,
          agencia_dv: agenciaDv,
          bank_code: bankCode,
          conta,
          conta_dv: contaDv,
          document_number: documentNumber,
          legal_name: legalName,
          type,
        },
      },
      t,
    } = this.props

    return (
      <Row>
        <Col
          desk={12}
          palm={12}
          tablet={12}
          tv={12}
        >
          <Card>
            <CardContent>
              <DetailsHead
                identifier={legalName}
                properties={[
                  {
                    children: bankCode,
                    title: t('models.bank_account.bank'),
                  },
                  {
                    children: formatAgencyAccount(agencia, agenciaDv),
                    title: t('models.bank_account.agency'),
                  },
                  {
                    children: formatAgencyAccount(conta, contaDv),
                    title: t('models.bank_account.account'),
                  },
                  {
                    children: formatAccountType(t, type),
                    title: t('models.bank_account.account_type'),
                  },
                  {
                    children: formatCpfCnpj(documentNumber),
                    title: t('models.bank_account.document'),
                  },
                ]}
                title={t('models.bank_account.legal_name')}
              />
            </CardContent>
          </Card>
        </Col>
      </Row>
    )
  }

  renderDataStep () {
    const {
      maximum,
      onCancel,
      t,
    } = this.props

    return isNil(maximum) || maximum < 100
      ? buildEmptyState(onCancel, t)
      : this.renderWithdrawForm()
  }

  renderWithdrawForm () {
    const {
      amount,
      available,
      date,
      maximum,
      onBack,
      onCancel,
      onFormSubmit,
      onRequestedChange,
      requested,
      t,
      transferCost,
    } = this.props

    return (
      maximum
        ? <WithdrawForm
          amount={amount}
          available={available}
          date={date}
          maximum={maximum}
          onBack={onBack}
          onCancel={onCancel}
          onRequestedChange={onRequestedChange}
          onSubmit={onFormSubmit}
          requested={requested}
          t={t}
          transferCost={transferCost}
        />
        : null
    )
  }

  renderCurrentStep () {
    const {
      amount,
      confirmationPasswordError,
      currentStep,
      date,
      disabled,
      onCancel,
      onConfirmationConfirm,
      onConfirmationReturn,
      onTryAgain,
      onViewStatement,
      recipient,
      requested,
      statusMessage,
      stepsStatus,
      t,
      transferCost,
    } = this.props

    return (
      <Fragment>
        {currentStep === 'data' && this.renderRecipient()}
        <Row>
          <Col
            desk={12}
            palm={12}
            tablet={12}
            tv={12}
          >
            {currentStep === 'data' && this.renderDataStep()}
            {currentStep === 'confirmation' &&
              <WithdrawConfirmation
                amount={amount}
                bankAccount={recipient.bank_account}
                date={date}
                disabledButtons={disabled}
                onCancel={onCancel}
                onConfirm={onConfirmationConfirm}
                onReturn={onConfirmationReturn}
                passwordError={confirmationPasswordError}
                requested={requested}
                t={t}
                transferCost={transferCost}
              />
            }

            {currentStep === 'result' &&
              <WithdrawResult
                amount={amount}
                bankAccount={recipient.bank_account}
                date={date}
                onTryAgain={onTryAgain}
                onViewStatement={onViewStatement}
                requested={requested}
                status={stepsStatus.result}
                statusMessage={statusMessage}
                t={t}
                transferCost={transferCost}
              />
            }
          </Col>
        </Row>
      </Fragment>
    )
  }

  render () {
    const { t } = this.props

    return (
      <Grid>
        <Row>
          <Col
            desk={12}
            palm={12}
            tablet={12}
            tv={12}
          >
            <Card>
              <Steps
                status={this.getStepsStatus()}
                steps={[
                  { id: 'data', title: t('pages.withdraw.data') },
                  { id: 'confirmation', title: t('pages.withdraw.confirmation') },
                  { id: 'result', title: t('pages.withdraw.conclusion') },
                ]}
              />
            </Card>
          </Col>
        </Row>
        {this.renderCurrentStep()}
      </Grid>
    )
  }
}

Withdraw.propTypes = {
  amount: PropTypes.number.isRequired,
  available: PropTypes.number,
  confirmationPasswordError: PropTypes.string.isRequired,
  currentStep: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(moment).isRequired,
  disabled: PropTypes.bool.isRequired,
  maximum: PropTypes.number,
  onBack: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirmationConfirm: PropTypes.func.isRequired,
  onConfirmationReturn: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onRequestedChange: PropTypes.func.isRequired,
  onTryAgain: PropTypes.func.isRequired,
  onViewStatement: PropTypes.func.isRequired,
  recipient: PropTypes.shape({
    bank_account: PropTypes.shape({
      agencia: PropTypes.string,
      agencia_dv: PropTypes.string,
      bank_code: PropTypes.string,
      conta: PropTypes.string,
      conta_dv: PropTypes.string,
      document_number: PropTypes.string,
      document_type: PropTypes.string,
      legal_name: PropTypes.string,
      type: PropTypes.string,
    }),
  }),
  requested: PropTypes.number.isRequired,
  statusMessage: PropTypes.string,
  stepsStatus: PropTypes.shape({
    confirmation: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
    result: PropTypes.string.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
  transferCost: PropTypes.number.isRequired,
}

Withdraw.defaultProps = {
  available: null,
  maximum: null,
  recipient: {
    bank_account: {
      agencia: '',
      agencia_dv: '',
      bank_code: '',
      conta: '',
      conta_dv: '',
      document_number: '',
      document_type: '',
      legal_name: '',
      type: '',
    },
  },
  statusMessage: '',
}

export default Withdraw
