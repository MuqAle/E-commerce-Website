import DropDownButton from "../reviews-components/dropdown";
import arrow from '../../assets/imgs/svg-imgs/arrow_forward_ios_FILL0_wght100_GRAD-25_opsz48.svg'

interface DropDownType{
    array:{filter:string, count:number}[] | string[],
    open:boolean
    sortFnc?:(i:number) => void,
    filterFnc?:(e:React.ChangeEvent<HTMLInputElement>) => void
    openFnc:() => void,
    name:string
}

const DropDown = ({array,open,sortFnc,filterFnc,openFnc,name,}:DropDownType) => {
    
    return(
        <div className={open ? "drop-down-container" : "drop-down-container active"}>
            <button  className="dropdown-toggle-btn" onClick={openFnc}>
                {name}
                <img src={arrow}/>
                </button>
                <ul style={open ? {maxHeight: '1000px',transition: 'max-height 1.3s ease-in-out'}:{maxHeight:'0'}} className="dropdown-content">
                    {array.map((item,i) => {
                        if(typeof item === 'string'){
                            return(
                                <li key={i}>
                                    <DropDownButton 
                                    title={item}
                                    applyActive = {() => {
                                    sortFnc && sortFnc(i)}}/>
                                </li>)
                        }else{
                            return(
                                <li key={i}>
                                    <input type="checkbox" onChange={(e) =>filterFnc && filterFnc(e)} id={item.filter} name={item.filter} value={item.filter}/>
                                    <label htmlFor={item.filter}>{item.filter[0].toUpperCase() + item.filter.slice(1)}</label>
                                    <p>{item.count}</p>
                                </li>
                            )
                        }
                    })}
                </ul>
        </div>

    )
}


export default DropDown