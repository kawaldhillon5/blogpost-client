import {  useOutletContext } from "react-router-dom"
import "../css/index-route.css"

import Welcome from "../components/welcome";
import FeaturedBlog from "../components/featured-blog";
import Notifications from "../components/notifications";
import Cta from "../components/CTA";
import FloatingButton from "../components/expandable-cta/expandable-cta";

export async function loader() {

    return null; 
}
export default function Index(){
    const context = useOutletContext();
    const viewMode = context.viewMode;
    const user = context.user

    return (

        <div className={viewMode ? "home-page-container": "home-page-container-mobile"}>
            <div id={viewMode ? "blogs-container-home" : "blogs-container-home-mobile"}>
                <Welcome />
                <FeaturedBlog />   
            </div>
            {viewMode && <div className="call-to-action">
                <Cta />
                <Notifications user={user}/>
            </div>}
            {
                !viewMode && <FloatingButton />
            }
        </div>
    )
}