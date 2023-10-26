import usePagination from "../hooks/pagination";
import disabledBackArrow from '../assets/imgs/svg-imgs/arrow-back-disabled.svg'
import disabledFrontArrow from  '../assets/imgs/svg-imgs/arrow-forward-disabled.svg'
import backArrow from  '../assets/imgs/svg-imgs/arrow_back_ios_new_FILL0_wght100_GRAD0_opsz48.svg'
import frontArrow from  '../assets/imgs/svg-imgs/arrow_forward_ios_FILL0_wght100_GRAD-25_opsz48.svg'


interface PaginationTypes {
  onPageChange:(num : number) => void,
  totalCount:number,
  currentPage:number,
  pageSize:number,
  siblingCount:number
  slideToView:() => void
}


const Pagination = (
{  onPageChange,
  totalCount,
  currentPage,
  siblingCount,
  pageSize,
 slideToView}:PaginationTypes
) => {

    const paginationRange = usePagination(
        totalCount,
        pageSize,
        siblingCount,
        currentPage,
    )
    
    const DOTS = '...'

    if (currentPage === 0 || paginationRange && paginationRange.length < 2) {
        return null;
      }
    
      const onNext = () => {
        onPageChange(currentPage + 1)
        slideToView()
      }
    
      const onPrevious = () => {
        onPageChange(currentPage - 1)
        slideToView()
      }
    
      const lastPage = paginationRange && paginationRange[paginationRange.length - 1]

     
      return (
        <ul className={'pagination-container'}>
          <button
            className={currentPage === 1 ? 'arrow left disabled':'arrow left'}
            onClick={onPrevious}>
            <img src={currentPage === 1 ? disabledBackArrow:backArrow}/>
          </button>
          {paginationRange && paginationRange.map((pageNumber,index) => {
            if (pageNumber === DOTS) {
              return <li key={index} className="pagination-item dots">&#8230;</li>;
            }
            return (
              <button
                key={index}
                className={pageNumber === currentPage ? 'pagination-item selected' : 'pagination-item'}
                onClick={() => {
                  onPageChange(Number(pageNumber))
                  slideToView()}}
              >
                {pageNumber}
              </button>
            )
          })}
          <button
            className={currentPage === lastPage ? 'arrow right disabled':'arrow right' }
            onClick={onNext}
          >
            <img src={currentPage === lastPage ? disabledFrontArrow:frontArrow}/>
          </button>
        </ul>
      )
}

export default Pagination