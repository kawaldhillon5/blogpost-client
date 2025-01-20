import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { getRequestFunc, postEditorReq } from "../helper-functions";

export default function Cta(){
    const [reqStatus, setreqStatus] = useState(4);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useOutletContext();

    useEffect(()=>{
        const getReqStatus = async()=>{
            if(user){    
                if(!user.isEditor){
                    try {
                    const resp = await getRequestFunc('client/EditorReqStatus');
                    console.log(resp);
                    if(!(resp.status === 200)){
                        throw new Error(resp.data);
                    } setreqStatus(resp.data);
                }catch(err){
                    setError(err.message);
                } finally {
                    setLoading(false);
                }} else {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        }
        getReqStatus();
    },[]);

    const handleApply = async ()=>{
        if((!error) && user){
            setreqStatus(0);
            try{
                const resp = await postEditorReq();
                if(!(resp.status === 200)){
                    throw new Error(resp.data);
                } 
            } catch(err){
                setreqStatus(4);
                setError(err.message);
            }
        }
    }

    if(loading){
        return (<div id="cta-loading-div"><div className="loader"></div></div>)
    }

    return(
        <>
            {user ? (
                user.isEditor ? (
            <div>
                <h2>Ready to Share Your Thoughts?</h2>
                <Link to="/editor/blog/new/0" className="write-blog-button">Write Your Blog</Link>
            </div>
            ) :
            (
            <div>
                <h2>Become a Blogger ?</h2>
                { reqStatus == 4 ?
                    <button className="write-blog-button" onClick={async()=>{await handleApply()}}>Apply</button>
                    : reqStatus == 0 ?
                    <button disabled={true} className="write-blog-button-applied">Applied</button>
                    : null
                }
            </div>   
            ) 
            ) : (
            <div>
                <h2>Join Our Community!</h2>
                <p>Sign up to share your stories and connect with other readers.</p>
                <div className='auth-buttons'>
                <Link to="/authenticate/signUp" className="auth-button">Sign Up</Link>
                <Link to="/authenticate/logIn" className="auth-button">Log In</Link>
                </div>
            </div>
            )}       
        </>
    )

}