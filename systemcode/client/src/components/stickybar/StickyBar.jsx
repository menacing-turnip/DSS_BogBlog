import { Link } from "react-router-dom"
import "./stickybar.css"

export default function StickyBar() {
    const user = false;
    return (
        <div className="sticky">
            <div className="stickyLeft">
                <i className="stickyIcon fa-brands fa-facebook"></i>
                <i className="stickyIcon fa-brands fa-twitter-square"></i>
                <i className="stickyIcon fa-brands fa-pinterest"></i>
                <i className="stickyIcon fa-brands fa-instagram-square"></i>
            </div>
            <div className="stickyCenter">
                <ul className="stickyList">
                    <li className="stickyListItem"><Link className="link" to="/">HOME</Link></li>
                    <li className="stickyListItem"><Link className="link" to="/">ABOUT US</Link></li>
                    <li className="stickyListItem"><Link className="link" to="/">GET IN CONTACT</Link></li>
                    <li className="stickyListItem"><Link className="link" to="/write">WRITE A BLOG</Link></li>
                    <li className="stickyListItem">
                        {user && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className="stickyRight">
                {
                    user ? (
                        <img
                            className="stickyImage"
                            src="https://images.pexels.com/photos/476/man-person-red-white.jpg?cs=srgb&dl=pexels-gratisography-476.jpg&fm=jpg"
                            alt=""
                        />
                    ) : (
                        <ul className="stickyList">
                            <li className="stickyListItem">
                                <Link className="link" to="/login">LOGIN</Link>
                            </li>   
                            <li className="stickyListItem">
                                <Link className="link" to="/register">REGISTER</Link>
                            </li>
                        </ul>   
                    )
                }
                
                <i className="stickySearchIcon fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    )
}