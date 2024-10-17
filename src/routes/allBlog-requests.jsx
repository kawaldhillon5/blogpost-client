import { NavLink, redirect, useLoaderData } from "react-router-dom";
import { getAllBlogRequests } from "../helper-functions";
import { format } from "date-fns";

import "../css/blog-requests.css";

export async function action(){
    return redirect('/client/requestBlog');
}

export async function loader() {
    const reqs = await getAllBlogRequests();
    return {reqs};
}

export default function AllBlogRequests(){
    const {reqs} = useLoaderData();

    return (
        <div id="main_req_div">
            <div className="req_div" id="blog_req_div">
                <div className="req_div_title">Blog Requests</div>
                    <button type="submit">New Request</button>
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
                                        <div className="blog_req_item_date">{format(req.date_created, "yyyy/mm/dd")}</div>
                                    </div>
                                    <div className="blog_req_item_desc">{req.desc}</div>
                                    <div className="blog_req_item_user">-{req.user.userName}</div>
                                </li>
                            ))
                        }
                    </ul>
            </div>
        </div>
    )
}