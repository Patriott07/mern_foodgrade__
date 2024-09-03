
import { useRouter } from "next/navigation";
// import { useSelector } from "react-redux";

export const PrivateRoute = (user:object) => {
    const router = useRouter();
    if(!user){
        return router.push('/login');
    }    
}