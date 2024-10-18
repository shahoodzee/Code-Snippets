export const getLocalDate = (dateString) => {
    try{
        // Create a new Date object from the ISO string
        const date = new Date(dateString);
    
        // Get the local date and time as a string
        const localDateTime = date.toLocaleString();
        return localDateTime;
    }
    catch(err){
        console.error(err);
        return "N/A"
    }
}