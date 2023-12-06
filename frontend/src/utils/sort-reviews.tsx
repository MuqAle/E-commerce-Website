import {  ReviewType } from "./types";
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'






const sortReviewsInDiffArray = (arr:ReviewType[] | undefined) => {
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

const sortLowestRating  = (arr:ReviewType[] | undefined):ReviewType[] | undefined => {
    if(arr){
        if(arr.length <= 1){
            return arr
        }
        const pivot = arr[0]
        const leftArray = []
        const rightArray = []
        for(let i = 1 ; i < arr.length; i+=1){
            if(arr[i].rating < pivot.rating){
                leftArray.push(arr[i])
            }else{
                rightArray.push(arr[i])
            }
        }
        
        return [...sortLowestRating(leftArray) as ReviewType[],pivot,...sortLowestRating(rightArray) as ReviewType[]] 
    }  
}

const sortHighestRating = (arr:ReviewType[] | undefined):ReviewType[] | undefined => {
    if(arr){
        if(arr.length <= 1){
            return arr
        }
        const pivot = arr[0]
        const leftArray = []
        const rightArray = []
        for(let i = 1 ; i < arr.length; i+=1){
            if(arr[i].rating > pivot.rating){
                leftArray.push(arr[i])
            }else{
                rightArray.push(arr[i])
            }
        }
        return [...sortHighestRating(leftArray) as ReviewType[],pivot,...sortHighestRating(rightArray) as ReviewType[]] 
    } 
}

const sortRecentDate = (arr:ReviewType[] | undefined):ReviewType[] | undefined  => {
    if(arr){
        if(arr.length <= 1){
            return arr
        }
        const pivot = arr[0]
        const leftArray = []
        const rightArray = []
        for(let i = 1 ; i < arr.length; i+=1){
            if(new Date(arr[i].datePosted).getTime() > new Date(pivot.datePosted).getTime()){
                leftArray.push(arr[i])
            }else{
                rightArray.push(arr[i])
            }
        }
        
        return [...sortRecentDate(leftArray) as ReviewType[],pivot,...sortRecentDate(rightArray) as ReviewType[]] 
    } 
}

const sortOldestDate = (arr:ReviewType[] | undefined):ReviewType[] | undefined  => {
    if(arr){
        if(arr.length < 1){
            return arr
        }
        const pivot = arr[0]
        const leftArray = []
        const rightArray = []
        for(let i = 1 ; i < arr.length; i+=1){
            if(new Date(arr[i].datePosted).getTime() < new Date(pivot.datePosted).getTime()){
                
                leftArray.push(arr[i])
            }else{
                rightArray.push(arr[i])
            }
        }
        return [...sortOldestDate(leftArray) as ReviewType[],pivot,...sortOldestDate(rightArray) as ReviewType[]] 
    } 
}

const formatTimeDifference = (time:Date) => {

    const postedDate = new Date(time).toLocaleString()
    const distanceDate = formatDistanceToNowStrict(new Date(postedDate))
    if(distanceDate.split(' ')[1] === 'year'){
        return postedDate
    }else{
        return (`${distanceDate} ago`)
    }
}

export {sortReviewsInDiffArray,
        sortHighestRating,
        sortLowestRating,
        sortOldestDate,
        sortRecentDate,
        formatTimeDifference}