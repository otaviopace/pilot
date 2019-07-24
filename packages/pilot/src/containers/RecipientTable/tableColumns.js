import React from 'react'
import {
  pipe,
  prop,
} from 'ramda'

import {
  Button,
  Col,
  Row,
  Grid,
} from 'former-kit'

import formatDate from '../../formatters/longDate'
import StatusLegend from './statusLegend'
import style from './style.css'

const columnData = data => (
  data.map(item => (
    <Col
      key={item.title}
      palm={12}
      tablet={12}
      desk={12}
      tv={12}
    >
      <span>{item.title}: <strong>{item.content}</strong></span>
    </Col>
  ))
)

const antecipationModel = (data) => {
  if (data.automatic_anticipation_enabled === false) {
    return 'manual'
  }

  if (data.automatic_anticipation_type === 'full') {
    return 'automatic_volume'
  }

  if (data.automatic_anticipation_days === '10,25') {
    return 'automatic_1025'
  }

  const antecipationDays = data.automatic_anticipation_days.split(',')

  if (antecipationDays.length === 31) {
    return 'automatic_dx'
  }

  return 'custom'
}

const renderColumnTransferDay = (data, t) => {
  const weekDaysMap = {
    1: t('pages.add_recipient.monday'),
    2: t('pages.add_recipient.tuesday'),
    3: t('pages.add_recipient.wednesday'),
    4: t('pages.add_recipient.thursday'),
    5: t('pages.add_recipient.friday'),
  }

  return (
    {
      content: weekDaysMap[data.transfer_day],
      title: t('pages.recipients.transfer_day'),
    }
  )
}

const getDefaultColumns = ({
  onDetailsClick,
  t,
}) => ([
  {
    accessor: ['status'],
    orderable: false,
    renderer: item => (
      <StatusLegend
        isAcronym
        item={item}
        t={t}
      />
    ),
    title: t('pages.recipients.status'),
    width: 74,
  },
  {
    accessor: ['id'],
    orderable: false,
    title: t('pages.recipients.id'),
    width: 240,
  },
  {
    accessor: ['bank_account', 'id'],
    orderable: false,
    title: t('pages.recipients.bank_account_id'),
    width: 158,
  },
  {
    accessor: ['bank_account', 'legal_name'],
    orderable: false,
    title: t('pages.recipients.bank_account_legal_name'),
  },
  {
    accessor: ['bank_account', 'document_number'],
    orderable: false,
    title: t('pages.recipients.bank_account_document_number'),
    width: 172,
  },
  {
    accessor: ['date_created'],
    orderable: false,
    renderer: pipe(prop('date_created'), formatDate),
    title: t('pages.recipients.date_created'),
    width: 126,
  },
  {
    accessor: ['updated_at'],
    isAction: false,
    renderer: data => (
      <Grid>
        <Col
          palm={6}
          tablet={6}
          desk={6}
          tv={6}
          className={style.marginBottom}
        >
          <Row>
            {columnData([
              {
                content: formatDate(data.date_updated),
                title: t('pages.recipients.date_updated'),
              },
              {
                content: t(`pages.recipients.automatic_anticipation_enabled_boolean.${data.automatic_anticipation_enabled}`),
                title: t('pages.recipients.automatic_anticipation_enabled'),
              },
              {
                content: t(`pages.recipients.anticipation_model_of.${antecipationModel(data)}`),
                title: t('pages.recipients.anticipation_model'),
              },
              {
                content: `${data.anticipatable_volume_percentage}%`,
                title: t('pages.recipients.anticipatable_volume_percentage'),
              },
            ])}
          </Row>
        </Col>
        <Col
          palm={6}
          tablet={6}
          desk={6}
          tv={6}
        >
          <Row>
            {data.transfer_day !== 0 && data.transfer_interval === 'weekly' &&
              columnData([
              {
                content: t(`pages.recipients.transfer_enabled_boolean.${data.transfer_enabled}`),
                title: t('pages.recipients.transfer_enabled'),
              },
              {
                content: t(`pages.recipients.transfer_interval_of.${data.transfer_interval}`),
                title: t('pages.recipients.transfer_interval'),
              },
              renderColumnTransferDay(data, t),
            ])}
            {data.transfer_day === 0 &&
              columnData([
              {
                content: t(`pages.recipients.transfer_enabled_boolean.${data.transfer_enabled}`),
                title: t('pages.recipients.transfer_enabled'),
              }, {
                content: t(`pages.recipients.transfer_interval_of.${data.transfer_interval}`),
                title: t('pages.recipients.transfer_interval'),
              },
            ])
            }
          </Row>
        </Col>
      </Grid>
    ),
    title: '',
  },
  {
    isAction: true,
    orderable: false,
    renderer: index => (
      <Button
        fill="outline"
        onClick={() => onDetailsClick(index)}
      >
        {t('pages.recipients.show_details')}
      </Button>
    ),
    title: '',
  },
])

export default getDefaultColumns
