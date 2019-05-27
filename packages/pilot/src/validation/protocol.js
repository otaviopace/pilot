import isUrl from 'validator/lib/isURL'

const options = {
  protocols: ['http', 'https'],
  require_protocol: true,
}

export default message => value => (!value || !isUrl(value, options)) && message
