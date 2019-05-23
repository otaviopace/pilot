export const formatBankAccount = account => ({
  documentNumber: account.document_number,
  name: account.legal_name,
  number: account.conta,
  number_digit: account.conta_dv,
  type: account.type,
  agency: account.agencia,
  agency_digit: account.agencia_dv || '',
  bank: account.bank_code,
  id: account.id.toString(),
})

const formatBankAccounts = (foundBankAccounts) => {
  const accounts = foundBankAccounts.map(formatBankAccount)

  return { accounts }
}

export default formatBankAccounts
