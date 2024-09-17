import { Form, redirect } from "react-router-dom";
import { postBlogRequest } from "../helper-functions";

export async function action({request, params}) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await postBlogRequest(updates);
    return redirect('../client/allBlogRequests');
}

export default function CreateBlogRequest() {
    return (
        <div id="blog_req_form_div">
            <Form method="post" id="blog_req_form">
                <div id="title_input_div">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title_input" />
                </div>
                <div id="desc_input-div">
                    <label htmlFor="desc">Description</label>
                    <input type="textarea" name="desc"  id="desc_input" />
                </div>
                <div id="form_button_div">
                    <button type="submit">Submit</button>
                    <button type="button">Cancel</button>
                </div>
            </Form>
        </div>
    )
}