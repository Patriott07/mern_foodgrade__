
interface outputHandler{
    message : string
    status : number
}

export const handleRegister = async(property : FormData) : Promise<outputHandler>  => {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/auth/register`, {
            method : "POST",
            body : property,
            headers : {
                "Content-Type" : "application/json"
            }
        });

        const data = await res.json();
        
        let output : outputHandler = {
            message : data.message,
            status : 200,
        } 
        return output
    }catch(err){
        console.log(err);
        let output : outputHandler = {
            message : "Error while making account, try again.",
            status : 403
        } 
        return output;
    }
}