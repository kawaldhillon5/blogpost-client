import { Form, redirect, useActionData } from "react-router-dom";
import { logIn } from "../../helper-functions";

export async function action({request, params}) {
    const formData = await request.formData();
    try {
        const response = await logIn(formData.get("username"), formData.get("password"));
        console.log(response);
        if(!(response.status === 200)) {
            throw new Error(response.data);
        }
    } catch (error){
        console.log(error.message);
        return error.message;
    }
    return redirect('/');
}

export default function LogIn(){
    let error = useActionData()
    
    return (
        <div id="log_in_div">
            <Form method="post" id="log_in_form">
                <div id="form-input_div">
                    <label htmlFor="username">username:</label>
                    <input type="text" name="username" />
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password"/>
                </div>
                <button type="submit">Log In</button>
                <span>  {error}</span>
            </Form>
        </div>
    )
}