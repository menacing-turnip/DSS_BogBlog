import axios from "axios";
import { useEffect, useState } from "react"
import "./sidebar.css"
import { Link } from 'react-router-dom';

export default function SideBar() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("/categories");
            setCats(res.data);
        }
        getCats();
    },[])
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">BIO</span>
                <img
                    src="https://images.pexels.com/photos/476/man-person-red-white.jpg?cs=srgb&dl=pexels-gratisography-476.jpg&fm=jpg"
                    alt=""
                />
                <p>
                    A man with no plan and an (almost) unhackable account on the least (un)hackable platform on the web.
                    Bow down in reverence and respect; stand in awe and amazement - BEHOLD - God of the bog!
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cats.map(c => (
                        <Link to={`/?cat=${c.name}`} className="link">
                            <li className="sidebarListItem">{c.name}</li>
                        </Link>
                    ))}
                    
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US!</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fa-brands fa-facebook"></i>
                    <i className="sidebarIcon fa-brands fa-twitter-square"></i>
                    <i className="sidebarIcon fa-brands fa-pinterest"></i>
                    <i className="sidebarIcon fa-brands fa-instagram-square"></i>
                </div>
            </div>
        </div>
    )
}