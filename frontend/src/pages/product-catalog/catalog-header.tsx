import { useImmer } from "use-immer"
import DropDown from "./dropdown"
import { FilterArray, FilterQueryType } from "./catalog"
import closeBtn from '../../assets/imgs/svg-imgs/close_FILL0_wght100_GRAD0_opsz48.svg'
import { useEffect } from "react"
import disableScrollModal from "../../utils/stop-scrolling"


interface CatalogHeaderType{

    sortNameArray:string[],
    filterMetal:FilterArray[],
    filterColor:FilterArray[],
    filterPrice:FilterArray[]
    sortFnc:(i:number) => void
    filterFnc:(key: keyof Partial<FilterQueryType>,e: React.ChangeEvent<HTMLInputElement>) => void
    priceFilterFnc :(key: keyof Partial<FilterQueryType>,e: React.ChangeEvent<HTMLInputElement>) => void
    clearFilters : () => void
    filtersApplied: Partial<FilterQueryType>
    sortApplied:string,
    sortArray:string[]
}


const CatalogHeader = (
    {sortNameArray,
    filterColor,
    filterPrice,
    filterFnc,
    priceFilterFnc,
    sortFnc,
    clearFilters,
    filterMetal,
    sortApplied,
    sortArray,
    filtersApplied}:CatalogHeaderType
) => {

    const [openSort, setOpenSort] = useImmer(false)
    const [openFilter,setOpenFilter] = useImmer({
        price:false,
        metal:false,
        color:false
    })
    const [openMenu, setOpenMenu] = useImmer(false)

    useEffect(() => {
        disableScrollModal(openMenu)
     
      }, [openMenu])


    const closeFilters = (key?:keyof typeof openFilter) => {
        if(key){
            setOpenFilter(filter => {
                filter[key] = false
                return filter
            }
            )
        }else{
            setOpenSort(sort => {
                sort = false
                return sort
            })
        }

    }

    const countFilters = () => {
        let filters = 0
        const filtersInObject = Object.keys(filtersApplied).length
        filters += filtersInObject
        if(filtersApplied.colors || filtersApplied.metal){
            filters += filtersApplied.colors ? filtersApplied.colors.length - 1 : 0
            filters += filtersApplied.metal ? filtersApplied.metal.length - 1 : 0
        }

        return filters
    }



    return(
        <div className="sort-filter-container" >
            <button className='filter-sort-btn' onClick={() => setOpenMenu(true)}>
                Filter/Sort {countFilters()}
            </button>
        <div className="filter-catalogue-container" style={openMenu ? {background : 'rgba(0, 0, 0, 0.6)'}:
         {background:'transparent',visibility:'hidden'}}
         onClick={(e) => {
            e.stopPropagation()
            setOpenMenu(false)}}>
         <div className="filter-catalogue" style={openMenu ? {width:'100%'} : {width:'0'}}
         onClick={(e) => e.stopPropagation()}>
            <button className="close-filter-menu" onClick={() => setOpenMenu(false)}>
                <img src={closeBtn}/>
            </button>
            <DropDown
            filtersApplied={filtersApplied}
            array={filterMetal}
            name="Metal"
            open={openFilter.metal}
            filterFnc={filterFnc}
            openFnc={() => {setOpenFilter(filter =>  {filter.metal = !filter.metal})}}
            closeFnc={() => closeFilters('metal')}
            />
            <DropDown
            filtersApplied={filtersApplied}
            array={filterColor}
            name="Colors"
            open={openFilter.color}
            filterFnc={filterFnc}
            closeFnc={() => closeFilters('color')}
            openFnc={() => setOpenFilter(filter => {filter.color = !filter.color})}/>
            <DropDown
            filtersApplied={filtersApplied}
            array={filterPrice}
            name="Price Range"
            open={openFilter.price}
            filterFnc={priceFilterFnc}
            closeFnc={() => closeFilters('price')}
            openFnc={() => setOpenFilter(filter => {filter.price = !filter.price})}/>
            <DropDown array={sortNameArray}
            filtersApplied={filtersApplied} 
            open={openSort}
            sortFnc={sortFnc}
            openFnc={() => setOpenSort(!openSort)}
            closeFnc={closeFilters}
            sortApplied={sortApplied}
            sortArray={sortArray}
            name='Sort'
            />
            <div className="clear-filters-container">
                <button onClick={() => {
                    clearFilters()}} className="clear-filters">Clear All Filters
                </button>
            </div>
        </div>
        </div>
  
        
    </div>
    )
}

export default CatalogHeader