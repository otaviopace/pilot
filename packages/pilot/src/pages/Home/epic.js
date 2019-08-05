import { of as rxOf } from 'rxjs'
import {
  catchError,
  map,
  mergeMap,
} from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'
import {
  METRICS_REQUEST,
  receiveMetrics,
  failMetrics,
} from './actions'

const getTransactionsMetrics = (client, dates) => client
  .transactions
  .metrics(dates)

const metricsEpic = (action$, state$) => action$
  .pipe(
    ofType(METRICS_REQUEST),
    mergeMap(({ payload: dates }) => {
      const state = state$.value
      const { account: { client } } = state
      return getTransactionsMetrics(client, dates)
    }),
    map(receiveMetrics),
    catchError((error) => {
      const { message } = error

      return rxOf(failMetrics({ message }))
    })
  )

export default combineEpics(metricsEpic)
