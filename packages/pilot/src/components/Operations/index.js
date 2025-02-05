import React, {
  Fragment,
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import Download32 from 'emblematic-icons/svg/Download32.svg'
import { isNil } from 'ramda'
import {
  CardTitle,
  Dropdown,
  Flexbox,
  isMomentPropValidation,
  Pagination,
  Spacing,
} from 'former-kit'
import moment from 'moment'
import ExportData from '../ExportData'
import TableData from './TableData'
import dateFormat from '../../formatters/longDate'
import style from './style.css'

const getExportOptions = onExport => ([
  {
    action: () => onExport('csv'),
    title: 'CSV',
  },
  {
    action: () => onExport('xlsx'),
    title: 'Excel',
  },
])

class Operations extends PureComponent {
  constructor (props) {
    super(props)

    this.renderSubTitle = this.renderSubTitle.bind(this)
  }

  renderSubTitle () {
    const {
      currentPage,
      disabled,
      exporting,
      itemsPerPage,
      labels: {
        exportCall,
        exportTo,
      },
      onExport,
      onPageChange,
      onPageCountChange,
      pageSizeOptions,
      subtitle,
      totalPages,
    } = this.props

    return (
      <div className={style.subtitle}>
        {subtitle}
        { onExport
          && (
            <Fragment>
              <ExportData
                exportOptions={getExportOptions(onExport)}
                icon={<Download32 width={12} height={12} />}
                loading={exporting}
                placement="bottomEnd"
                relevance="low"
                size="tiny"
                subtitle={exportTo}
                title={exportCall}
              />
              <Spacing size="tiny" />
            </Fragment>
          )
        }
        <Dropdown
          disabled={disabled}
          name="page-count"
          onChange={e => onPageCountChange(parseInt(e.target.value, 10))}
          options={pageSizeOptions}
          size="tiny"
          value={itemsPerPage.toString()}
        />
        <Spacing size="tiny" />
        <Pagination
          currentPage={currentPage}
          disabled={disabled}
          onPageChange={onPageChange}
          format="single"
          totalPages={totalPages}
        />
      </div>
    )
  }

  renderTitle () {
    const {
      count,
      dates: {
        end,
        start,
      },
      labels: {
        results,
        totalOf,
      },
    } = this.props

    const separator = (
      <Fragment>
        &nbsp;<small>-</small>&nbsp;
      </Fragment>
    )

    const isTodayPreset = moment(start).isSame(end, 'day')

    return (
      <span className={style.title}>
        <strong>{dateFormat(start)}</strong>
        {!isTodayPreset && separator}
        {!isTodayPreset && <strong>{dateFormat(end)}</strong>}
        {!isNil(count) && count > 0 && results
          && (
            <span>
              {separator}
              {totalOf}
              &nbsp;
              <strong>
                {count}
              </strong>
              &nbsp;
              {results}
            </span>
          )
        }
      </span>
    )
  }

  render () {
    const {
      columns,
      currentPage,
      disabled,
      labels: {
        empty,
      },
      loading,
      onPageChange,
      rows,
      totalPages,
    } = this.props

    return (
      <div className={style.container}>
        <div className={style.head}>
          <CardTitle
            subtitle={this.renderSubTitle()}
            title={this.renderTitle()}
          />
        </div>
        <TableData
          columns={columns}
          disabled={disabled}
          emptyMessage={empty}
          loading={loading}
          rows={rows}
        />
        <Flexbox justifyContent="flex-end">
          <Pagination
            currentPage={currentPage}
            disabled={disabled}
            format="single"
            onPageChange={onPageChange}
            totalPages={totalPages}
          />
        </Flexbox>
      </div>
    )
  }
}

const outShape = PropTypes.shape({
  amount: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
})

Operations.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    accessor: PropTypes.arrayOf(PropTypes.string).isRequired,
    orderable: PropTypes.bool.isRequired,
    renderer: PropTypes.func,
    title: PropTypes.string.isRequired,
  })).isRequired,
  count: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  dates: PropTypes.shape({
    end: isMomentPropValidation.isRequired,
    start: isMomentPropValidation.isRequired,
  }).isRequired,
  disabled: PropTypes.bool,
  exporting: PropTypes.bool.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  labels: PropTypes.shape({
    empty: PropTypes.string.isRequired,
    exportCall: PropTypes.string.isRequired,
    exportTo: PropTypes.string.isRequired,
    results: PropTypes.string,
    totalOf: PropTypes.string,
  }).isRequired,
  loading: PropTypes.bool,
  onExport: PropTypes.func,
  onPageChange: PropTypes.func.isRequired,
  onPageCountChange: PropTypes.func.isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
    ]),
    net: PropTypes.number.isRequired,
    outcoming: PropTypes.arrayOf(outShape).isRequired,
    outgoing: PropTypes.arrayOf(outShape).isRequired,
    paymentDate: PropTypes.shape({
      actual: PropTypes.string,
      original: PropTypes.string,
    }).isRequired,
    sourceId: PropTypes.string,
    targetId: PropTypes.string,
    transactionId: PropTypes.number,
    type: PropTypes.string.isRequired,
  })).isRequired,
  subtitle: PropTypes.node,
  totalPages: PropTypes.number.isRequired,
}

Operations.defaultProps = {
  count: null,
  disabled: false,
  loading: false,
  onExport: null,
  subtitle: null,
}

export default Operations
