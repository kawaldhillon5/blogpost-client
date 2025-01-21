import {  useOutletContext } from "react-router-dom"
import "../css/index-route.css"

import Welcome from "../components/welcome";
import FeaturedBlog from "../components/featured-blog";
import Notifications from "../components/notifications";
import Cta from "../components/CTA";

export async function loader() {

    return null; 
}
export default function Index(){

    const user = useOutletContext();

    return (

        <div className="home-page-container">
            <div id="blogs-container-home">
            <Welcome />
            <FeaturedBlog />   
            </div>
            <div className="call-to-action">
                <Cta />
                <Notifications />
            </div>
        </div>
    )
}