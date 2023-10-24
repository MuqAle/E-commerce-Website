import usePagination from "../hooks/pagnation";


const Pagination = (
        onPageChange:(num : number|string) => void,
        totalCount:number,
        siblingCount = 1,
        currentPage:number,
        pageSize:number,
) => {


    const paginationRange = usePagination(
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    )

    const DOTS = '...'

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
      }
    
      const onNext = () => {
        onPageChange(currentPage + 1)
      }
    
      const onPrevious = () => {
        onPageChange(currentPage - 1)
      }
    
      const lastPage = paginationRange[paginationRange.length - 1]

      return (
        <ul
          className={'pagination-container'}
        >
          <li
            className={currentPage === 1 ? 'pagination-item disabled':'pagination-item'}
            onClick={onPrevious}
          >
            <div className="arrow left" />
          </li>
          {paginationRange.map(pageNumber => {
             
            if (pageNumber === DOTS) {
              return <li className="pagination-item dots">&#8230;</li>;
            }
            
            // Render our Page Pills
            return (
              <li
                className={pageNumber === currentPage ? 'pagination-item-selected' : 'pagination-item'}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </li>
            );
          })}
          {/*  Right Navigation arrow */}
          <li
            className={currentPage === lastPage ? 'pagination-item disabled':'pagination-item' }
            onClick={onNext}
          >
            <div className="arrow right" />
          </li>
        </ul>
      );
}

export default Pagination