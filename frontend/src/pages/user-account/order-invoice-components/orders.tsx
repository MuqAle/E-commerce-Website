import { OrderType} from "../../../utils/types"
import OrderListComponent from "./order-component"
import Pagination from "../../../components/pagination"
import { useMemo} from "react"
import { useImmer } from "use-immer"





const UserOrder = ({orders}:{orders:OrderType[]}) => {

    const [currentPage, setCurrentPage] = useImmer(1)
    const PageSize = 6


    const currentData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return orders.slice(firstPageIndex, lastPageIndex);
      }, [currentPage, orders])

      const scrollOrderTitle = () => {
        window.scrollTo(0, 0)
    }

      
    return(
        <div className="order-main-container">
            <h2 className="order-title">Orders</h2>
            <div className="order-list">
                {
                    orders.length === 0 ? 
                    <p>No Orders Have Been Made</p> 
                    :
                    currentData.map((order) => (
                        <OrderListComponent key={order.id} order={order} ></OrderListComponent>
                    ))
                }
            </div>
            <Pagination 
                slideToView={scrollOrderTitle}
                onPageChange={page => setCurrentPage(page)}
                totalCount={orders.length }
                currentPage={currentPage}
                pageSize={PageSize} siblingCount={1} />

        </div>
    )
}

export default UserOrder