import React from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  FormDropdown,
  Row,
} from 'former-kit'

const SelectAccount = ({
  onChange,
  options,
  t,
  value,
}) => (
  <Row>
    <Col tv={2} desk={4} tablet={5} palm={8}>
      <FormDropdown
        label={t('pages.add_recipient.select_bank_account')}
        name="id"
        onChange={onChange}
        options={options}
        value={value}
      />
    </Col>
  </Row>
)

SelectAccount.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  t: PropTypes.func.isRequired,
  value: PropTypes.string,
}

SelectAccount.defaultProps = {
  options: [],
  value: '',
}

export default SelectAccount
