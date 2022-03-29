import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./singlePost.css";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});

    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get("/posts/" + path)
            setPost(res.data)
        };
        fetchPost();
    }, [path]);
    console.log(post);
    return (
        <>
            <div className="singlePost">
                <div className="singlePostWrapper">
                    {post.photo && (<img src={post.photo} alt="" className="singlePostImage" />)}
                    <h1 className="singlePostTitle">
                        {post.title}
                        <div className="singlePostEdit">
                            <i className="singlePostIcon fa-solid fa-file-pen"></i>
                            <i className="singlePostIcon fa-solid fa-trash"></i>
                        </div>
                    </h1>
                    <div className="singlePostInfo">
                        <span className="singlePostAuthor">
                            Author:
                            <Link to={`/?user=${post.username}`} className="link">
                                <b>{post.username}</b>
                            </Link>
                        </span>
                        <span className="singlePostDate">
                            {new Date(post.published_on).toDateString()}
                        </span>
                    </div>
                    <p className="singlePostDescription">
                        {post.description}
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

                </div>
            </div>
        </>

    );
}