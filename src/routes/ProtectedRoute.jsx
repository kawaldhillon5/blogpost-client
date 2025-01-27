import { useNavigate, Outlet, useOutletContext } from "react-router-dom";
import { useEffect } from "react";


export default function ProtectedRoute() {
    const context = useOutletContext();
    const user = context.user;
    const viewMode = context.viewMode; 
    const navigate = useNavigate();
    useEffect(()=>{
         function fun(){
            const res = user;
            if(res === null) {
                navigate('/authenticate/logIn', {replace: true});
            }
    } fun()
    },[user ,navigate]);

    return  user ? <Outlet context={{user, viewMode}}/>: navigate('/authenticate/logIn', {replace: true})
        
}

