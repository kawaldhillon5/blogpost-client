import { Form, redirect, useActionData, useLoaderData, useLocation } from "react-router-dom";
import { logIn } from "../../helper-functions";
import documImg from "../../assets/images/document-Img.jpg";


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
    const previousLocation = JSON.parse(formData.get('previousLocation'));
    console.log(previousLocation);
    if (previousLocation) {
        return redirect(`${previousLocation}`)
      }
    return redirect('/');
}

export default function LogIn(){
    let error = useActionData()
    const location = useLocation();
    console.log(location);
    return (
        <div id="login_div">
            <div id="left_login_div">
            <img id="docu_img" src={documImg}></img>
            </div>
            <div id="right_login_div">
                <Form method="post" id="log_in_form">
                    <div id="form_input_div_login">
                        <fieldset id="login_fieldset">
                        <input type="hidden" name="previousLocation" value={JSON.stringify(location.state?.from || '/')} />
                            <div className="login_in_group">
                                <label htmlFor="username">username:</label>
                                <input type="text" name="username" />
                            </div>
                            <div className="login_in_group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" name="password"/>
                            </div>
                        </fieldset>
                    </div>
                    <button type="submit">Log In</button>
                    <span>{error}</span>
                </Form>
            </div>
        </div>
    )
}