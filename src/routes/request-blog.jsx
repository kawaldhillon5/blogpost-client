import { useLoaderData } from "react-router-dom";
import { getBlogRequest } from "../helper-functions";
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
                        <div id="blog_req_title">{blogReq.title}<div id="blog_req_detail_date">{` (${format(blogReq.date_created, "yyyy/mm/dd")})`}</div></div>
                        <div id="blog_req_votes_div">Votes: {blogReq.votes}</div>
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

