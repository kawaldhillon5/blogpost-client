import { useLoaderData } from "react-router-dom";
import { getBlogsByAuthor } from "../helper-functions";

export async function loader({params}) {
    let resp = [];
    let error = null;
    try {
        const res = await getBlogsByAuthor(params.authorId);
        if(res.status === 200) {
            resp = res.data;
        }  else {
            throw new Error(res.data);
        }  
    } catch (err) {
        console.log(err);
        error = err.message;
    }
    
    return { resp, error };
}

export default function Author() {
    const { resp, error } = useLoaderData();
    console.log("resp: ",resp);
    console.log("error:",error);
    return (
        <div>
            <h1>Author Route</h1>
        </div>
    )   
}