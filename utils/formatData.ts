export const formatDepartament = (value: number) => {
  const departament = {
    [18]: 'TI',
    [11]: 'DP',
    [-2]: 'Departamento Geral',
    [16]: 'Financeiro',
    [5]: 'Contas a pagar',
  } as any;

  return departament[value] ? departament[value] : 'Departamento não encontrado'
}

export const formatStatus = (value: string) => {
  const status = {
    'bost_Open': 'Aberto',
    'bost_Close': 'Fechado',
  } as any

  return status[value] ? status[value] : 'Status não encontrado'
}

export const formatCanceled = (value: string) => {
  const canceled = {
    'tNO': 'Não',
    'tYES': 'Sim',
  } as any

  return canceled[value] ? canceled[value] : 'Cancelado não encontrado'
}