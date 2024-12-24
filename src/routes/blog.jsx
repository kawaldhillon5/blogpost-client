import { useFetcher, useLoaderData, useOutletContext, useSubmit } from "react-router-dom";
import { formatDate, getBlog, getComments, getUser, isVotedByUser, postComment, postVote } from "../helper-functions"
import HtmlParser from "react-html-parser";
import { format } from "date-fns";
import "../css/blog-detail.css";
import { useEffect } from "react";

export async function action({request,params}) {
    const formData = await request.formData();
    if(formData.get("vote")){
        await postVote(params.blogId);
    } else {
       await postComment(params.blogId, formData.get("comment"));
    }
    return null; 
}

export async function loader({params}){
    const blog = await getBlog(params.blogId);
    const isVoted = await isVotedByUser(params.blogId);
    const comments = await getComments(params.blogId);
    return {blog, isVoted, comments};
}

export default function Blog(){
    const {blog, isVoted, comments} = useLoaderData();
    const fetcher = useFetcher(); 
    const voted = fetcher.formData ? fetcher.formData.get("vote") === "false" : isVoted === 200 ? true: false;
    console.log(comments.data);

    useEffect(()=>{
        document.querySelector("#comment_form_in").value = "";
        
    });

    useEffect(()=>{
        const tags = document.querySelectorAll('.tag_div');
        styleTags(tags);
    },[]);

    return (

        <div id="blog_div">  
            <div id="blog_title_div_detail">
                <div className="blog_title">{blog.title}</div>   
                <div id="blog_title_date_and_count">
                    <fetcher.Form method="post" className="votes_comments_main_details_page">
                        <button name="vote"
                                value={voted ? "true": "false"}
                                className={`${voted ? "vote_btn_blue votes_count_details": "vote_btn_grey votes_count_details"}`}
                        ></button>
                    </fetcher.Form>
                    { blog.tags.length ?
                        <div id="blog_tags_div">
                            {
                              blog.tags.map(tag =>(
                                <div className="tag_div">{tag}</div>
                              ))  
                            }
                        </div>
                        : null
                    }
                </div>
                <div className="blog_date">{formatDate(blog.date_created)}</div>
            </div>
            <div id="blog_body_div">{HtmlParser(blog.body)}</div>
            <div id="blog_author">-{`${blog.author.first_name} ${blog.author.last_name}`}</div>
            <div id="comments_div_main">
                <div id="comments_div_header">
                    <div id="comments_header_text">Comments: {blog.comments.length}</div>
                    <fetcher.Form method="post" id="comment_post_form">
                        <input required id="comment_form_in" type="text" name="comment" placeholder="Type Your Comment here" />
                        <button  className="comments_new_btn">Post </button>
                    </fetcher.Form>
                </div>
                    { !(comments.status === 200) 
                        ? <div id="comments_div_error">
                            <i>Could Not Load Comments</i> 
                          </div> 
                          :
                            comments.data.length ? 
                            <div id="comments_div_list">
                                {comments.data.map((comment)=>(
                                    <Comment text={comment.text} date_created={comment.date_created} madeBy={comment.madeBy} />
                                ))
                                }
                            </div> :
                            null 
                    }
            </div>
        </div>
    )
}
const Comment = ({ text, date_created, madeBy }) => {
    const formattedDate = formatDate(date_created);
  
    return (
      <div className="comment">
        <div className="comment-header"> {/* New header section */}
          <span className="comment-author">
            {/* Display "Anonymous" if madeBy is not available or not a valid ObjectId */}
            {madeBy.userName || "Anonymous"}
          </span>
          <span className="comment-date">{formattedDate}</span>
        </div>
        <p className="comment-text">{text}</p>
      </div>
    );
};

// function Tag({text}){

//     const randomRed = Math.floor(Math.random() * 256);
//     const randomGreen = Math.floor(Math.random() * 256);
//     const randomBlue = Math.floor(Math.random() * 256);
//     const randomColor = `rgba(${randomRed}, ${randomGreen}, ${randomBlue}, ${0.2})`;
//     const borderColor = `rgba(${randomRed}, ${randomGreen}, ${randomBlue}, ${1})`;

//     return (
//         <div className="tag_div" style={{backgroundColor: `${randomColor}`,border: `1px solid ${borderColor}`}}>{text}</div>
//     )
// }

function styleTags(tagElements) {
    tagElements.forEach(tag => {
      const randomRed = Math.floor(Math.random() * 256);
      const randomGreen = Math.floor(Math.random() * 256);
      const randomBlue = Math.floor(Math.random() * 256);
      const randomAlpha = Math.random() * 0.5 + 0.3; // Alpha between 0.3 and 0.8 (more visible)

      const randomColor = `rgba(${randomRed}, ${randomGreen}, ${randomBlue}, ${randomAlpha})`;
      const borderColor = `rgba(${randomRed}, ${randomGreen}, ${randomBlue}, ${1})`;

  
      // Apply styles
      tag.style.backgroundColor = randomColor;
      tag.style.border = `1px solid, ${borderColor}`
    });
}
  

  
