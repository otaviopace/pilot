import React from 'react'
import IconInfo from 'emblematic-icons/svg/Info32.svg'
import { Tooltip } from 'former-kit'
import VisaIcon from './icons/visa.svg'
import MastercardIcon from './icons/mastercard.svg'
import OutrosIcon from './icons/outros.svg'

const brands = {
  default: {
    getTitle: text => (
      <span
        style={{
          display: 'flex',
        }}
      >
        <span style={{ marginRight: '5px' }}>Outros</span>
        <Tooltip
          content={<span>{text}</span>}
          placement="rightMiddle"
        >
          <IconInfo width={16} height={16} />
        </Tooltip>
      </span>
    ),
    icon: <OutrosIcon />,
  },
  master: {
    icon: <MastercardIcon />,
    title: 'Mastercard',
  },
  visa: {
    icon: <VisaIcon />,
    title: 'Visa',
  },
}

export default brands
