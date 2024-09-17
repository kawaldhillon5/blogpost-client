import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import { getAllBlogRequests } from "../helper-functions";

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
        <div id="all_blog_req_div">
            {reqs.length ? (
                    <div id="not_empty_all_blog_req_div">
                        <div id="all_blog_req_header_div">
                            <p>All Requests</p>
                            <Form method="post">
                                <button type="submit">New Request</button>
                            </Form>
                        </div>
                        <div id="all_blog_req_list_div">
                            <ul>
                                {reqs.map( req => (
                                    <li key={req._id}>
                                        <Link to={`../client/requestBlog/${req._id}`}>{req.title}</Link>
                                        <div className="all_blog_req_date">{req.date_created}</div>
                                        <div className="all_blog_req_votes">Votes: {req.votes}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div id = "empty_all_blog_req_div">
                        <i>No Request</i>
                        <Form method="post">
                            <button type="submit">New Request</button>
                        </Form>
                    </div>
                )
            }
        </div>
    )
}