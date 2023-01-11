import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"

export type PaginationProps = {
  currentPage: number
  totalPages: number
  onChangePage: (page: number) => void
  isNextPage?: boolean
  isPreviousPage?: boolean
}

export const Pagination = ({currentPage, totalPages, onChangePage, isNextPage, isPreviousPage }: PaginationProps) => {

  const [page, setPage] = useState(currentPage)

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  useEffect(() => {
    onChangePage(page)

  }, [page])

  useEffect(() => {
    setPage(currentPage)
  }, [currentPage])



  return (
    <div className="w-full p-2 mx-auto sm:p-4">
      <nav aria-label="Pagination" className="inline-flex -space-x-px rounded-md shadow-sm border-gray-200 bg-gray-300">
        <button disabled={currentPage <= 1 ? !isPreviousPage : isPreviousPage } onClick={handlePreviousPage} type="button" className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-l-md bg-brand-primary hover:bg-brand-secondary text-brand-light disabled:bg-gray-500">
          <span className="sr-only">Anterior</span>
          <Icon icon="ic:baseline-keyboard-arrow-left" width={32}/>
        </button>
        <button type="button" aria-current="page" className="inline-flex items-center px-4 py-2 text-sm font-semibold border">
          Pagina Atual {currentPage}
        </button>

        <button disabled={isNextPage} onClick={handleNextPage} type="button" className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-r-md bg-brand-primary hover:bg-brand-secondary text-brand-light disabled:bg-gray-500">
          <span className="sr-only">Proximo</span>
          <Icon icon="ic:baseline-keyboard-arrow-right" width={32}/>
        </button>
      </nav>
    </div>
  )
}