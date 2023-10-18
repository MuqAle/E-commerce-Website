import { ProductDb } from "./types";



const sortReviewsInDiffArray = (arr:ProductDb['reviews']) => {
    const oneStar = []
    const twoStar = []
    const threeStar = []
    const fourStar = []
    const fiveStar = []
    
    if(arr){
        for(const i of arr){
            switch(i.rating){
                case 1:
                    oneStar.push(i)
                    break
                case 2:
                    twoStar.push(i)
                    break
                case 3:
                    threeStar.push(i)
                    break
                case 4:
                    fourStar.push(i)
                    break
                case 5:
                    fiveStar.push(i)
            } 
        } 
        
        return(
            [oneStar,
            twoStar,
            threeStar,
            fourStar,
            fiveStar])
    }
}

const sortLowestRating  = (arr:ProductDb['reviews']) => {
    if(arr){
        if(arr.length < 1){
            return arr
        }
        const pivot = arr[0]
        const leftArray = []
        const rightArray = []
        for(let i = 0 ; i < arr.length; i+=1){
            if(arr[i] < pivot){
                leftArray.push(arr[i])
            }else{
                rightArray.push(arr[i])
            }
        }
        return [...leftArray,pivot,...rightArray]
    }  
}

const sortHighestRating = (arr:ProductDb['reviews']) => {
    if(arr){
        if(arr.length < 1){
            return arr
        }
        const pivot = arr[0]
        const leftArray = []
        const rightArray = []
        for(let i = 0 ; i < arr.length; i+=1){
            if(arr[i] > pivot){
                leftArray.push(arr[i])
            }else{
                rightArray.push(arr[i])
            }
        }
        return [...leftArray,pivot,...rightArray]
    } 
}

const sortRecentDate = (arr:ProductDb['reviews']) => {
    if(arr){
        if(arr.length < 1){
            return arr
        }
        const pivot = arr[0].datePosted.getTime()
        const leftArray = []
        const rightArray = []
        for(let i = 0 ; i < arr.length; i+=1){
            if(arr[i].datePosted.getTime() > pivot){
                leftArray.push(arr[i])
            }else{
                rightArray.push(arr[i])
            }
        }
        return [...leftArray,pivot,...rightArray]
    } 
}

const sortOldestDate = (arr:ProductDb['reviews']) => {
    if(arr){
        if(arr.length < 1){
            return arr
        }
        const pivot = arr[0].datePosted.getTime()
        const leftArray = []
        const rightArray = []
        for(let i = 0 ; i < arr.length; i+=1){
            if(arr[i].datePosted.getTime() < pivot){
                leftArray.push(arr[i])
            }else{
                rightArray.push(arr[i])
            }
        }
        return [...leftArray,pivot,...rightArray]
    } 
}

const formatTimeDifference = (time:Date) => {

    const currentDate = new Date();
    const timeDifferenceMilliseconds = currentDate.getTime() - time.getDate();
    const seconds = Math.floor(timeDifferenceMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4); // Approximating a month as 4 weeks
    const years = Math.floor(months / 12);

    if (years > 0) {
        return years === 1 ? "1 year ago" : `${years} years ago`;
    } else if (months > 0) {
        return months === 1 ? "1 month ago" : `${months} months ago`;
    } else if (weeks > 0) {
        return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    } else if (days > 0) {
        return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
        return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
        return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else {
        return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
    }

}

export {sortReviewsInDiffArray,
        sortHighestRating,
        sortLowestRating,
        sortOldestDate,
        sortRecentDate,
        formatTimeDifference}