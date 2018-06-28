import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

import account, { epic as accountEpic } from './Account/actions'
import errors, { epic as errorsEpic } from './ErrorBoundary'
import balance from './Balance'
import anticipation, { epic as anticipationEpic } from './Anticipation'
import { reducers as transactionsReducers } from './Transactions'
import { reducers as recipientsReducers } from './Recipients'

export const rootEpic = combineEpics(accountEpic, anticipationEpic, errorsEpic)

export const rootReducer = combineReducers({
  account,
  anticipation,
  balance,
  errors,
  recipients: recipientsReducers.search,
  transactionDetails: transactionsReducers.details,
  transactions: transactionsReducers.search,
})
