import { Pagination } from "@/useComponents/Pagination"
import { Table } from "@/useComponents/Table"

export const PurchaseOrderCase = () => {

  const headers = [
    {
      title: 'N° documento',
      fn: () => console.log('N° documento')
    },
    {
      title: 'Responsável',
      fn: () => console.log('Responsável')
    },
    {
      title: 'Departamento',
      fn: () => console.log('Departamento')
    },
    {
      title: 'Assunto',
      fn: () => console.log('Assunto')
    },
    {
      title: 'Status',
      fn: () => console.log('Status')
    },
    {
      title: 'Cancelado',
      fn: () => console.log('Cancelado')
    },
  ]


  return (
    <>
      <Table title={'Solicitação de Compra'} headerItems={headers}>
        {Array.from({length: 10}).map((_, index) => (
          <tr key={index} className="border-b border-gray-200 bg-gray-300">
            <td className="p-3 text-left">1</td>
            <td className="p-3 text-left">2</td>
            <td className="p-3 text-left">3</td>
            <td className="p-3 text-left">4</td>
            <td className="p-3 text-left">5</td>
            <td className="p-3 text-left">6</td>
          </tr>
        ), [])}
      </Table>
      <Pagination currentPage={1} totalPages={10} />
    </>
  )
}