import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./singlePost.css";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    //this was broken for 2 days - cant honestly say why but changing useState({}) to useState([{}]) fixed a typeError problem when accessing 
    //post elements using syntax post[0].element_name
    const [post, setPost] = useState([{}]);
    const PF = "http://localhost:5000/images/";
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(()=>{
        const fetchPost = async ()=>{
            const res = await axios.get("/posts/"+path)
            setPost(res.data)
            setTitle(res.data[0].title)
            setDescription(res.data[0].description)
        };
        fetchPost();
    }, [path]);

    const handleDelete = async () => {
        try {
            await axios.delete("/posts/" + path, {data:{ username: user[0].username }});
            window.location.replace("/");
        } catch (err) { }
    };

    const handleUpdate = async () => {
        try {
            await axios.put("/posts/" + path, { username: user[0].username, title, description });
            //window.location.reload();
            setUpdateMode(false);
        } catch (err) { }
    };
    //console.log(post[0])
    //NOTE:: TO FIX THE SINGLE POST NOT SHOWING UP YOU NEED TO ADD [0] AFTER  post (FOR EXAMPLE; post.title BECOMES post[0].title)
    //^ THIS HOWEVER BREAKS WHEN YOU RELOAD THE PAGE
    return (
        <>
            <div className="singlePost">
                <div className="singlePostWrapper">
                    {post[0].photo && (<img src={PF + post[0].photo} alt="" className="singlePostImage" />)}
                    {
                        user !== null ?
                            updateMode ? <input
                                type="text"
                                value={title}
                                className="singlePostTitleInput"
                                autoFocus
                                onChange={(e) => setTitle(e.target.value)}
                            /> : (
                                <h1 className="singlePostTitle">
                                    {title}
                                    {post[0].username === user[0]?.username && (
                                        <div className="singlePostEdit">
                                            <i className="singlePostIcon fa-solid fa-file-pen" onClick={() => setUpdateMode(true)}></i>
                                            <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                                        </div>
                                    )}
                                </h1>
                            ) : (
                                <h1 className="singlePostTitle">
                                    {title}
                                    
                                </h1>
                                )
                    }
                    <div className="singlePostInfo">
                        <span className="singlePostAuthor">
                            Author:
                            <Link to={`/?user=${post[0].username}`} className="link">
                                <b>{post[0].username}</b>
                            </Link>
                        </span>
                        <span className="singlePostDate">
                            {new Date(post[0].published_on).toDateString()}
                        </span>
                    </div>
                    {
                        updateMode ? <textarea
                            className="singlePostDescriptionInput"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        /> : (
                            <p className="singlePostDescription">
                                {description}
                                {/*
                                Look at my jive comments - I dare you to take the platform down!!!! Try DDoSing, Account Enumeration, Session Hijacking,
                                SQL Injection, Cross-Site Scripting, Cross-Site Forgery Requests.... Hell you could even try socially engineering a
                                developer DOX and come round to our houses and livestream yourself brutally assaulting and/or murdering one or all of us!
                                We dare you - we double dare you; we triple dare you while waving our collective, metaphorical, bare naked bum flaps
                                all over the place and up in your face - you cant, couldnt, wouldnt even dare if you could and we KNOW it!.... And more
                                importantly..... So do YOU!
                                Look at my jive comments - I dare you to take the platform down!!!! Try DDoSing, Account Enumeration, Session Hijacking,
                                SQL Injection, Cross-Site Scripting, Cross-Site Forgery Requests.... Hell you could even try socially engineering a
                                developer DOX and come round to our houses and livestream yourself brutally assaulting and/or murdering one or all of us!
                                We dare you - we double dare you; we triple dare you while waving our collective, metaphorical, bare naked bum flaps
                                all over the place and up in your face - you cant, couldnt, wouldnt even dare if you could and we KNOW it!.... And more
                                importantly..... So do YOU!
                                Look at my jive comments - I dare you to take the platform down!!!! Try DDoSing, Account Enumeration, Session Hijacking,
                                SQL Injection, Cross-Site Scripting, Cross-Site Forgery Requests.... Hell you could even try socially engineering a
                                developer DOX and come round to our houses and livestream yourself brutally assaulting and/or murdering one or all of us!
                                We dare you - we double dare you; we triple dare you while waving our collective, metaphorical, bare naked bum flaps
                                all over the place and up in your face - you cant, couldnt, wouldnt even dare if you could and we KNOW it!.... And more
                                importantly..... So do YOU!
                                Look at my jive comments - I dare you to take the platform down!!!! Try DDoSing, Account Enumeration, Session Hijacking,
                                SQL Injection, Cross-Site Scripting, Cross-Site Forgery Requests.... Hell you could even try socially engineering a
                                developer DOX and come round to our houses and livestream yourself brutally assaulting and/or murdering one or all of us!
                                We dare you - we double dare you; we triple dare you while waving our collective, metaphorical, bare naked bum flaps
                                all over the place and up in your face - you cant, couldnt, wouldnt even dare if you could and we KNOW it!.... And more
                                importantly..... So do YOU!
                                */}
                            </p>
                        )}
                    {
                        updateMode && (
                            <button className="singlePostButton" onClick={handleUpdate}>
                                Update
                            </button>
                    )}
                    
                </div>
            </div>
        </>

    );
}