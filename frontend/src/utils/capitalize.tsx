
const capitalize = (string:string | null) => {
    if(string){
        const words = string.split("-");
        words.join(" ")
        
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        
        
    
        return words.join(" ")
    }else{
        return
    }
   
}

export default capitalize