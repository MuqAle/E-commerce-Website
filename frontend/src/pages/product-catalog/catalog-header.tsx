import { useImmer } from "use-immer"
import DropDown from "./dropdown"
import { FilterArray } from "./catalog"


interface CatalogHeaderType{

    sortNameArray:string[],
    filterMetal:string[],
    filterColor:FilterArray[],
    sortFnc:(i:number) => void
    colorFnc:(e:React.ChangeEvent<HTMLInputElement>) => void,
    metalFnc:(e:React.ChangeEvent<HTMLInputElement>) => void
}


const CatalogHeader = (
    {sortNameArray,
    filterColor,
    metalFnc,
    sortFnc,
    filterMetal,
    colorFnc}:CatalogHeaderType
) => {

    const [openSort, setOpenSort] = useImmer(false)
    const [openFilter,setOpenFilter] = useImmer({
        price:false,
        metal:false,
        color:false
    })


    return(
        <div className="sort-filter-container">
        <div className="filter-catalogue">
            <DropDown
            array={filterMetal}
            name="Metal"
            open={openFilter.metal}
            filterFnc={metalFnc}
            openFnc={() => setOpenFilter(filter =>  {filter.metal = !filter.metal})}
            />
            <DropDown
            array={filterColor}
            name="Color"
            open={openFilter.color}
            filterFnc={colorFnc}
            openFnc={() => setOpenFilter(filter => {filter.color = !filter.color})}/>
        </div>
        <div className="sort-catalogue">
            <DropDown array={sortNameArray} 
            open={openSort}
            sortFnc={sortFnc}
            openFnc={() => setOpenSort(!openSort)}
            name='Sort'
            />
            
        </div>
        
    </div>
    )
}

export default CatalogHeader