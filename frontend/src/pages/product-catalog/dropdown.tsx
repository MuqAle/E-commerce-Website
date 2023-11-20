import DropDownButton from "../reviews-components/dropdown";
import arrow from '../../assets/imgs/svg-imgs/arrow_forward_ios_FILL0_wght100_GRAD-25_opsz48.svg'
import { FilterQueryType } from "./catalog";
import { useImmer } from "use-immer";
import useOutsideClick from "../../hooks/outside-click";

interface DropDownType{
    array:{filter:string, count:number}[] | string[],
    open:boolean
    sortFnc?:(i:number) => void,
    filterFnc?:(key: keyof Partial<FilterQueryType>,e: React.ChangeEvent<HTMLInputElement>)  => void
    closeFnc:() => void,
    openFnc:() => void,
    name:string
    filtersApplied:object
    sortArray?:string[],
    sortApplied?:string
}

const DropDown = ({
    array,
    open,
    sortFnc,
    filterFnc,
    openFnc,
    name,
    closeFnc,
    filtersApplied,
    sortArray,
    sortApplied}:DropDownType) => {

    const [checkedItems, setCheckedItems] = useImmer<Record<string, boolean>>({})
    const ref = useOutsideClick(closeFnc)

    const handleCheckboxChange = (itemName:string,e:React.ChangeEvent<HTMLInputElement>) => {
        if(name === 'Price Range'){
            setCheckedItems((prevCheckedItems) => ({
                [itemName]: !prevCheckedItems[itemName],
                }))
        }else{
            setCheckedItems((prevCheckedItems) => ({
                ...prevCheckedItems,
                [itemName]: !prevCheckedItems[itemName],
                }))
               
          }
          const filterKey = name[0].toLowerCase() + name.slice(1).replace(/\s+/g, '')
          filterFnc && filterFnc(filterKey as keyof FilterQueryType,e)
        }
        
    const extractNumber = (string:string) => {
        const match = string.match(/\d+/g) || []
        return match 
    }

   

    return(
        <div ref={ref} className={open ? "drop-down-container active":"drop-down-container"}>
            <button  className="dropdown-toggle-btn" onClick={openFnc}>
                {name}
                <img src={arrow}/>
                </button>
                <ul style={open ? {maxHeight: '1000px'}:{maxHeight:'0',height:'0'}} className="dropdown-content">
                    
                    {array.map((item,i) => {
                        if(typeof item === 'string'){
                            return(
                                <li key={i} style={ sortArray && sortArray[i] === sortApplied ? {backgroundColor:'#f4f2f2'}:{}}>
                                    <DropDownButton 
                                    title={item}
                                    applyActive = {() => {
                                    sortFnc && sortFnc(i)}}/>
                                </li>)
                        }else{
                            return(
                                <li key={i} style={checkedItems[item.filter] ? {backgroundColor:'#f4f2f2'}:{}}>
                                    <input type="checkbox" 
                                    checked={Object.keys(filtersApplied).length === 0 ? false:(checkedItems[item.filter] || false)}
                                    onChange={(e) => handleCheckboxChange(item.filter,e)} 
                                    id={item.filter} name={item.filter} value={
                                        name === 'Price Range' ? 
                                        extractNumber(item.filter) :
                                        item.filter}/>
                                    <label htmlFor={item.filter}>
                                        <p>
                                        {Number(item.filter[0]) ?
                                        '$' + item.filter :
                                        item.filter[0].toUpperCase() + item.filter.slice(1)
                                        }
                                        </p>
                                        <p>{item.count}</p>
                                        </label>
                                    
                                </li>
                            )
                        }
                    })}
                </ul>
        </div>

    )
}


export default DropDown