import axios from "axios";
import { useContext } from "react";
import { useState } from "react"
import { Context } from "../../context/Context";
import "./write.css"
import Reaptcha from 'reaptcha'

export default function Write() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);
    const [verified, setVerified] = useState(false);

    const onVerify = e => {
        setVerified(true);
    };

    const onExpire = e => {
        setVerified(false);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user[0].username,
            title,
            description
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) {

            }
        }
        try {
            const res = await axios.post("/posts/", newPost);
            window.location.replace("/post/" + res.data[0].pid);
        } catch (err) {

        }
    };
    return (
        <>
            <div className="write">
                {file &&
                    <img className="writeImage"
                    src={URL.createObjectURL(file)}
                        alt=""
                    />
                }
                
                <form className="writeForm" onSubmit={handleSubmit}>
                    <div className="writeFormGroup">
                        <label htmlFor="fileInput">
                            <i className="writeIcon fa-solid fa-file-image"></i>
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={e => setFile(e.target.files[0])}
                        />
                        <input
                            type="text"
                            placeholder="Enter a title..."
                            className="writeInput"
                            autoFocus={true}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="writeFormGroup">
                        <textarea
                            placeholder="Write a blog post..."
                            type="text"
                            className="writeInput writeText"
                            onChange={e => setDescription(e.target.value)}>
                        </textarea>
                    </div>
                    <Reaptcha className ="writeRecaptcha" sitekey="6Lce2e0fAAAAADEwYnL-no4nWZjLwhW_eOgSQmF-" onVerify={onVerify} onExpire={onExpire} />
                    <button className="writeSubmit" type="submit" disabled={!verified}>Submit Post</button>
                </form>
            </div>
        </>
    )
}