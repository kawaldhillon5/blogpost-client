import React, { useState } from "react";
import axios from "axios";

const baseURL = "http://localhost:3000/";

import ReactHtmlParser from "react-html-parser";

export default function Test(){
    const [posts, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${baseURL}client/allBlogPosts`).then((response) => {
        console.log(response.data);
      setPost(response.data);
    });
  }, []);

  if (!posts) return null;

  return (
    <div>
     { (posts.type == 1) ? (posts.posts.map(element => 
           ( <div>
                <a href={`client/blog/${element._id}`}>{element._id}</a>
                <p>{element.author.last_name}</p>
            </div>))
      ) : (<div>
            <p>{posts.post.content}</p>
            <p>{posts.post.author}</p>
          </div>)
    }
    </div>
  );
}