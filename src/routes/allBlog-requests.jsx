import { NavLink, redirect, useFetcher, useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { formatDate, getAllBlogRequests } from "../helper-functions";
import { format } from "date-fns";

import "../css/blog-requests.css";
import ReqVoteComponent from "../components/request-vote";

export async function action(){

}

export async function loader() {
    const reqs = await getAllBlogRequests();
    return {reqs};
}

export default function AllBlogRequests(){
    const {reqs} = useLoaderData();
    const user = useOutletContext();
    const navigate = useNavigate();
    const fetcher  = useFetcher();

    return (
        <div id="main_req_div">
            <div className="req_div" id="blog_req_div">
                <div className="req_div_title">Blog Requests</div>
                    {user ? <button type="button" onClick={()=> navigate('/client/requestBlog')}>New Request</button> : null}
                    <ul id="blog_req_items_div">
                        {
                            reqs.length === 0
                            ? <li className="req_list_item">No Requests</li>
                            : reqs.map((req)=>(
                                <li className="blog_req_list_item" key={req._id}>
                                    <div className="blog_req_item-top">
                                        <NavLink className={({ isActive, isPending }) =>
                                            isActive
                                            ? "blog_req_item_title active"
                                            : isPending
                                            ? "blog_req_item_title pending"
                                            : "blog_req_item_title"} to={`../client/requestBlog/${req._id}`}>{req.title}
                                            <div
                                            id="search-spinner"
                                            aria-hidden
                                            hidden={false}
                                            />
                                            </NavLink>
                                            { user ?
                                                <ReqVoteComponent id={req._id} type={'req'} />
                                                : null
                                            }
                                    </div>
                                    <div className="blog_req_item_desc">{req.desc}</div>
                                    <div className="blog_req_item_user_date">
                                        <div className="req_item_date">{formatDate(req.date_created)}</div>
                                        <div className="req_item_user">-{req.user.userName}</div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
            </div>
        </div>
    )
}