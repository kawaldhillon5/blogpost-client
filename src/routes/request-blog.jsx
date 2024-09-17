import { useLoaderData } from "react-router-dom";
import { getBlogRequest } from "../helper-functions";

export async function loader({params}){
    const blogReq = await getBlogRequest(params.reqId);
    console.log(blogReq);
    return {blogReq};
} 

export default function BlogRequest() {
    const {blogReq} = useLoaderData();

    return (
        <div id="blog_req_div">
            {blogReq ? (
                <div id="blog_req_detail_div">
                    <div id="blog_req_title_div">
                        <div id="blog_req_title">{blogReq.title}{` (${blogReq.date_created})`}</div>
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

