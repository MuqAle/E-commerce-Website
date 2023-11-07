import { Skeleton } from "@mui/material"

const EmptyCard = () => {
    return(
    <div className='card' style={{'width':'100%'}}>
        <div className='card-img'>
            <Skeleton className='jewelry-img' variant='rectangular' height='auto'></Skeleton>
        </div>
        <div className='label'>
            <Skeleton className='card-name' variant='text' sx={{ fontSize: '18px' }}/>
            <Skeleton className='price' variant='text' sx={{ fontSize: '18px' }}/>
            <Skeleton variant="rectangular" width={85} height={22} />
        </div>
    </div>
    )
}

export default EmptyCard
