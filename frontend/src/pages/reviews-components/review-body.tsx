import { ReviewType } from "../../utils/types"
import ReviewSingular from "./review-singular";
import {v4 as uuidv4} from 'uuid'
import {
    sortHighestRating,
    sortLowestRating,
    sortOldestDate,
    sortRecentDate} from "../../utils/sort-reviews";
import { useImmer } from "use-immer";
import DropDownButton from "./dropdown";
import {useEffect, useMemo} from "react";
import Pagination from "../../components/pagination";
import useOutsideClick from "../../hooks/outside-click";
import arrow from '../../assets/imgs/svg-imgs/arrow_forward_ios_FILL0_wght100_GRAD-25_opsz48.svg'







interface ReviewBodyType{
    filterReviewArray: ReviewType[][] | undefined,
    reviews:ReviewType[] | undefined
    scrollToTop: () => void
    myRef:React.RefObject<HTMLDivElement>
}

interface ActiveType{
    type:string,
    name:string,
    fnc?:(arr: ReviewType[] | undefined) => ReviewType[] | undefined
    filterReview?:ReviewType[] | undefined
}

const PageSize = 6

const ReviewBody = ({filterReviewArray,reviews,scrollToTop,myRef}:ReviewBodyType) => {


    const [displayReviews,setDisplayReviews] = useImmer<ReviewType[] | undefined>(reviews || [])
    const [ratingFilter,setRatingFilter] = useImmer<ReviewType[] | undefined>(reviews || [])
    const [sortFunction,setSortFunction] = useImmer<(arr:ReviewType[] | undefined) => ReviewType[] | undefined>(sortOldestDate)
    const [actives,setActives] = useImmer<ActiveType[]>([])
    const [dropDownShow,setDropDownShow] = useImmer({filter:false,sort: false })
    const filterArrayName = ['5 Star','4 Star','3 Star','2 Star','1 Star']
    const sortArrayName = ['Highest Rating','Lowest Rating','Oldest','Newest']
    const sortArrayFunction = [sortHighestRating,sortLowestRating,sortOldestDate,sortRecentDate]
    const [currentPage, setCurrentPage] = useImmer(1)

    useEffect(() => {
        setDisplayReviews(reviews)
        setActives([])
    },[reviews, setActives, setDisplayReviews])

    const currentData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return displayReviews?.slice(firstPageIndex, lastPageIndex);
      }, [currentPage, displayReviews])



      const handleSortOutsideClick = () => {
        setDropDownShow(drop => {
            drop.sort = false
            return drop
        })
      }
      const handleFilterOutsideClick = () => {
        setDropDownShow(drop => {
            drop.filter = false
            return drop
        })
      }

      const closeBothDropDown = () => {
        setDropDownShow(drop => {
            drop.filter = false
            drop.sort = false
            return drop
        })
      }

      const ref = useOutsideClick(handleSortOutsideClick)
      const filterRef = useOutsideClick(handleFilterOutsideClick)
      

      const openDropDown = (type:string,event:React.MouseEvent) => {
        event.stopPropagation()
        if(type === 'filter'){
            setDropDownShow(drop => {
                drop.filter = !drop.filter
            })
        }if(type === 'sort'){
            setDropDownShow(drop => {
                drop.sort = !drop.sort
            })
        }
      }


    const applyFilter = (filterName:string,filteredReviews:ReviewType[] | undefined) => {
        setRatingFilter(() => filteredReviews)
        
        setActives((draft) => {
            const index = draft.findIndex((active) => active.type === 'filter')
            if(index !== -1){
                draft[index].name = filterName
            }else{
                draft.push({ type: 'filter', name: filterName, filterReview:filteredReviews})
            }
            if(draft.length === 2){
                setDisplayReviews(() => sortFunction(filteredReviews))
            }else{
                setDisplayReviews(() => filteredReviews)
            }
        })
        
        closeBothDropDown()
      }

      const checkActives = (buttonType:string) => {
        for (const active of actives){
           if(active.type === buttonType){
            return true
           }
        }
        return false
      }
    
      const applySort = (sortName:string,sortedReviews:ReviewType[] | undefined,
        fnc:(arr: ReviewType[] | undefined) => ReviewType[] | undefined) => {
        setSortFunction(() => fnc)
        setActives((draft) => {
            const index = draft.findIndex((active) => active.type === 'sort')
            if(index !== -1){
                draft[index].name = sortName
                draft[index].fnc = fnc
            }else{
                draft.push({ type: 'sort', name: sortName,fnc:fnc })
            }
            if(draft.length === 2){
                setDisplayReviews(fnc(ratingFilter))
            }else{
                setDisplayReviews(sortedReviews)
            }
        })
        setCurrentPage(() => 1)
        
        closeBothDropDown()
      }

      const clearActive = (activeName:string) => {
        if(activeName === 'filter'){
            setRatingFilter(reviews)
        }
        setActives((draft) => {
            const index = draft.findIndex((active) => active.name === activeName)
            if (index !== -1) {
              draft.splice(index, 1)
            }
            if(draft.length === 0){
                setDisplayReviews(reviews)
            }else{
                if(draft[0].type === 'filter'){
                    setDisplayReviews(ratingFilter)
                }if(draft[0].type === 'sort'){
                    setDisplayReviews(draft[0].fnc && draft[0].fnc(reviews))
                }
            }
            return draft
          })

      }

      const clearAllActives = () => {
        setActives([])
        setDisplayReviews(reviews)
      }


    return(
        <div className="reviews-body">
                <div className="reviews-button">
                    <div ref={myRef}  className="reviews-btn-container">
                        <div ref={filterRef} className={dropDownShow.filter || checkActives('filter') ? "filter-reviews active" : "filter-reviews"}>
                            <button  className="dropdown-toggle-btn" onClick={(e) => openDropDown('filter',e)}>Filter
                            <img src={arrow}/>
                            </button>
                            <div style={dropDownShow.filter ? {maxHeight: '1000px',transition: 'max-height 1.3s ease-in-out'}:{maxHeight:'0'}} className="dropdown-content">
                                {filterArrayName.map((name,i) => {
                                    const index = 4 - i
                                    return(
                                        <DropDownButton key={i}
                                        title={name}
                                        applyActive = {() => filterReviewArray && applyFilter(name,filterReviewArray[index])}/>
                                    )
                                })}
                            </div>
                        </div>
                        <div ref={ref} className={dropDownShow.sort || checkActives('sort') ? "sort-reviews active" : "sort-reviews"}>
                            <button  className="dropdown-toggle-btn" onClick={(e) => openDropDown('sort',e)}>
                                Sort
                            <img src={arrow}/></button>
                                <div style={dropDownShow.sort ? {maxHeight: '1000px',transition: 'max-height 1.3s ease-in-out '}:{maxHeight:'0'}} className="dropdown-content">
                                    {sortArrayFunction.map((arr,i) =>
                                    {
                                        return(
                                            <DropDownButton key={i}
                                            title={sortArrayName[i]}
                                            applyActive={() => applySort(sortArrayName[i],arr(displayReviews),arr)}/>
                                        )
                                    })}
                                </div>
                        </div>
                    </div>
                        {
                            actives.length > 0 ?
                            <div className="active-applied">
                                {actives.map(active => {
                                    return(
                                        <div key={active.name}>
                                            <p>{active.name}</p>
                                            <button onClick={() =>  clearActive(active.name)}>&times;</button>
                                        </div>
                                    )
                                })}
                                <button className="clear-all-actives" onClick={clearAllActives}>Clear All</button>
                            </div>
                            : 
                            null
                        }
                </div>
                <div  className="reviews-list">
                    {
                        currentData && currentData.map(review => {
                            return(
                                <ReviewSingular review={review} key={uuidv4()}/>
                            )
                        }) 
                    }
                </div>
                <Pagination 
                slideToView={scrollToTop}
                onPageChange={page => setCurrentPage(page)}
                totalCount={displayReviews ? displayReviews.length : 0}
                currentPage={currentPage}
                pageSize={PageSize} siblingCount={1} />
            </div>
    )
}

export default ReviewBody