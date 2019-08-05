import {
  METRICS_RECEIVE,
  METRICS_REQUEST,
  METRICS_REQUEST_FAIL,
} from './actions'

const initialState = {
  loading: {
    metrics: true,
  },
  metrics: null,
  metricsError: null,
}

export default function anticipationReducer (state = initialState, action) {
  switch (action.type) {
    case METRICS_REQUEST: {
      return {
        loading: {
          metrics: true,
        },
        metricsError: null,
      }
    }

    case METRICS_RECEIVE: {
      const {
        payload,
      } = action

      return {
        loading: {
          metrics: false,
        },
        metrics: payload,
        metricsError: null,
      }
    }

    case METRICS_REQUEST_FAIL: {
      const {
        payload,
      } = action

      return {
        ...state,
        loading: {
          metrics: false,
        },
        metricsError: payload,
      }
    }

    default: {
      return state
    }
  }
}
