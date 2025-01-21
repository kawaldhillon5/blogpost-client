import { redirect, useLoaderData, Form, NavLink, useOutletContext } from "react-router-dom";
import "../css/myBlogs.css"
import { getMyBlogs, getRequestFunc, postEditorReq } from "../helper-functions";
import { useEffect, useState } from "react";

export async function action() {
    return redirect(`../editor/blog/new/0`);
}

export async function loader(){
    const blogs = await getMyBlogs();
    return {blogs};
}
export default function MyBlogs(){
    const {blogs} = useLoaderData();
    const user = useOutletContext();
    const [reqStatus, setreqStatus] = useState(4);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const getReqStatus = async()=>{
            if(user){
                setLoading(true);    
                if(!user.isEditor){
                    try {
                    const resp = await getRequestFunc('client/EditorReqStatus');
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

    return (
        <div id="blogs_div_main">
            {blogs.length ? (
                    <div id="blogs_div">
                        <div id="blogs_header">
                            <div id="blogs_div_title">My Blogs</div>
                            <Form method="post"><button type="submit" id="new_blog_button">New Blog</button></Form>
                        </div>
                        <ul id="blogs_list">
                            {blogs.map(blog =>
                                (<li className="blogs_list_item" key={blog._id}>
                                    <NavLink className={({ isActive, isPending }) =>
                                            isActive
                                            ? "blog_list_item_a active"
                                            : isPending
                                            ? "blog_list_item_a pending"
                                            : "blog_list_item_a"
                                        }to={`../editor/blog/edit/${blog._id}`}>{blog.title}
                                     </NavLink>
                                    <div className="votes_comments_main">
                                        <div className="votes_count">{blog.votes}</div>
                                        <div className="comments_count">{blog.comments.length}</div>
                                    </div>
                                    <PubReqStatus reqStatus={blog.publishReqStatus} />
                                </li>)
                            )}
                        </ul>
                    </div>
                ):(
                    <div id="no_blogs_div_myBlogs">
                        <i>No Blogs</i>
                        { user.isEditor ?
                            <Form method="post"><button type="submit" id="new_blog_button">New</button></Form> :
                            error ? <div>{error}</div> :
                            loading ? <div id="cta-loading-div"><div className="loader"></div></div> :
                            <div>
                                <h2>Become a Blogger ?</h2>
                                { reqStatus == 4 ?
                                    <button className="write-blog-button" onClick={async()=>{await handleApply()}}>Apply</button>
                                    : reqStatus == 0 ?
                                    <button disabled={true} className="write-blog-button-applied">Applied</button>
                                    : null
                                }
                            </div>  
                        }
                    </div>
                )
            }
        </div>
    )

}

function PubReqStatus({reqStatus}) {
    let message = null;

    switch (reqStatus) {
        case 0:
            message = "Not Sent"
            break;
        case 1:
            message = "Sent";
        break;
        case 2:
            message = "Accepted";
            break;
        case 3:
            message = "Rejected";
            break;
        default:
            message = "Invalid"; 
            break;
    }

    return (
        <>
            <div className={`blog_req_status_main status_color${reqStatus}`}>
                <p>{message}</p>
            </div>
        </>
    );
}