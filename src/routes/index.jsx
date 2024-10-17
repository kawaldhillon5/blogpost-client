import { Link, useOutletContext } from "react-router-dom"
import documImg from "../assets/images/document-Img.jpg"
import "../css/index-route.css"

export default function Index(){

    const user = useOutletContext();
    console.log(user);
    return (
        <div id="index_div">
            <div id="index_left_side">
                <img id="docu_img" src={documImg}></img>
            </div>
            <div id="index_right_side">
                <div id="index_div_wlcm_msg">
                    Welcome to the Blog Editor
                </div>
                {
                    (user.user === null) ?
                    <div id="auth_form_div">
                        <Link to={'/authenticate/logIn'} className="auth_link">Log In</Link>
                        <p>Or</p>
                        <Link to={'/authenticate/signUp'} className="auth_link">Sign Up</Link>
                    </div> :
                    <div id="index_user_name">{user.username}</div>
                }
            </div>
        </div>
    )
}