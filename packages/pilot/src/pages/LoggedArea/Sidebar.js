import React from 'react'
import PropTypes from 'prop-types'
import {
  curry,
  head,
  isNil,
  pipe,
  split,
  values,
} from 'ramda'

import {
  matchPath,
  withRouter,
} from 'react-router-dom'

import SidebarContainer from '../../containers/Sidebar'

import routes from './routes'

import Logo from '../../components/Logo/logo.svg'

const removeRouteParams = pipe(
  split(':'),
  head
)

const handleLinkClick = curry((push, currentPath, route) => {
  const matched = matchPath(currentPath, route)

  if (isNil(matched) || !route.active) {
    push(route.path)
  }
})

const Sidebar = ({
  // This block of code is commented because of issue #1159 (https://github.com/pagarme/pilot/issues/1159)
  // It was commented on to remove the anticipation limits call on Balance page
  // This code will be used again in the future when ATLAS project implements the anticipation flow
  // More details in issue #1159
  // anticipationLimit,
  balance,
  companyName,
  history,
  location: { pathname },
  recipientId,
  sessionId,
  t,
  transfersPricing,
}) => (
  <SidebarContainer
    balance={balance}
    companyName={companyName}
    links={values(routes)
      .filter(({ hidden }) => !hidden)
      .map(route => ({
        ...route,
        active: pathname.includes(removeRouteParams(route.path)),
      }))
    }
    logo={Logo}
    // This block of code is commented because of issue #1159 (https://github.com/pagarme/pilot/issues/1159)
    // It was commented on to remove the anticipation limits call on Balance page
    // This code will be used again in the future when ATLAS project implements the anticipation flow
    // More details in issue #1159
    // anticipationLimit={anticipationLimit}
    onLinkClick={handleLinkClick(history.push, pathname)}
    onWithdraw={() => history.push(`/withdraw/${recipientId}`)}
    sessionId={sessionId}
    t={t}
    transfersPricing={transfersPricing}
  />
)

Sidebar.propTypes = {
  // This block of code is commented because of issue #1159 (https://github.com/pagarme/pilot/issues/1159)
  // It was commented on to remove the anticipation limits call on Balance page
  // This code will be used again in the future when ATLAS project implements the anticipation flow
  // More details in issue #1159
  // anticipationLimit: PropTypes.number,
  balance: PropTypes.shape({
    available: PropTypes.number,
  }).isRequired,
  companyName: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  recipientId: PropTypes.string,
  sessionId: PropTypes.string,
  t: PropTypes.func.isRequired,
  transfersPricing: PropTypes.shape({
    ted: PropTypes.number,
  }),
}

Sidebar.defaultProps = {
  // This block of code is commented because of issue #1159 (https://github.com/pagarme/pilot/issues/1159)
  // It was commented on to remove the anticipation limits call on Balance page
  // This code will be used again in the future when ATLAS project implements the anticipation flow
  // More details in issue #1159
  // anticipationLimit: null,
  companyName: '',
  recipientId: null,
  sessionId: '',
  transfersPricing: {},
}

export default withRouter(Sidebar)
