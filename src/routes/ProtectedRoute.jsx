import { useNavigate, Outlet, useOutletContext } from "react-router-dom";
import { useEffect } from "react";


export default function ProtectedRoute() {
    const user = useOutletContext(); 
    const navigate = useNavigate();

    useEffect(()=>{
         function fun(){
            const res = user;
            console.log(res);
            if(res === null) {
                navigate('/authenticate/logIn', {replace: true});
            }
    } fun()
    },[user ,navigate]);

    return <Outlet context={user}/>
}

