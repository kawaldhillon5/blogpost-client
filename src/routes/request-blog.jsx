import { useLoaderData } from "react-router-dom";
import { formatDate, getBlogRequest } from "../helper-functions";
import { format } from "date-fns";
import '../css/blog-request-detail.css';
export async function loader({params}){
    const blogReq = await getBlogRequest(params.reqId);
    return {blogReq};
} 

export default function BlogRequest() {
    const {blogReq} = useLoaderData();

    return (
        <div id="blog_req_detail_div_main">
            {blogReq ? (
                <div id="blog_req_detail_div">
                    <div id="blog_req_header_div">
                        <div id="blog_req_title">{blogReq.title}</div>
                            <div id="blog_req_date">
                                <div id="blog_req_votes_div">Votes: {blogReq.votes}</div>
                                <div id="blog_req_detail_date">{`${formatDate(blogReq.date_created)}`}</div>
                            </div>
                    </div>
                    <div id="blog_req_desc_div">{blogReq.desc}</div>
                </div>
            ) : (
                <i>Could Not Load Request</i>
            )
            }
        </div>
    )
}

