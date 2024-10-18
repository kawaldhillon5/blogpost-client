import { Form, redirect, useActionData } from "react-router-dom";
import { postSignUpData } from "../../helper-functions";
import documImg from "../../assets/images/document-Img.jpg";


export async function action({request,params}) {
    const formData = await request.formData();
    if(formData.get("password1") === formData.get("password2")){
        const formObject = Object.fromEntries(formData.entries());
        formObject.dateCreated = new Date();
        console.log(formData.get("editorReq"));
        if(formData.get("editorReq") === null){
            formObject.editorReq = "off";
        }
        try{
            const res = await postSignUpData(formObject);
            if(!(res.status === 200)){
                throw new Error(res.data);
            }
        } catch(error){
            return error;
        }
    } else {
        const error = new Error("Password does not match");
        return error;
    }
    return redirect("../authenticate/logIn");
}

export default function SignUp(){
    const error = useActionData(); 
    return (
        <div id="sign_up_div">
            <div id="left_signup_div">
                <img id="docu_img" src={documImg}></img>
            </div>
                <div id="right_signup_div">
                    <Form method="post" id="signup_form">
                        <div id="form_input_div_signup">
                            <fieldset id="signup_fieldset">
                            <legend>Create Account</legend>
                                <div className="signup_in_group">
                                    <label htmlFor="username">Username:</label>
                                    <input type="text" name="username" required />
                                </div>
                                <div className="signup_in_group">
                                    <label htmlFor="firstname">First Name:</label>
                                    <input type="text" name="firstname" required />
                                </div>
                                <div className="signup_in_group">
                                    <label htmlFor="lastname">Last Name:</label>
                                    <input type="text" name="lastname" required />
                                </div>                      
                                <div className="signup_in_group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" name="email" required/>
                                </div>                           
                                <div className="signup_in_group">
                                    <label htmlFor="password1">Password:</label>
                                    <input type="password" name="password1" required/>
                                </div>                       
                                <div className="signup_in_group">
                                    <label htmlFor="password2">Confirm Password:</label>
                                    <input type="password" name="password2" required/>
                                </div>                        
                                <div className="signup_in_group">
                                    <label htmlFor="editorReq">Editor Request ?</label>
                                    <input type="checkbox" name="editorReq"></input>
                                </div>
                            </fieldset>
                        </div>
                        <button type="submit">Sign Up</button>
                    </Form>
                </div>
            <span>{(error) ? error.message: null}</span>
        </div>
    )
}