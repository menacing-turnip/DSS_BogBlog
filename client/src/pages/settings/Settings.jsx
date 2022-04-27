import axios from "axios";
import { useContext, useState } from "react"
import SideBar from "../../components/sidebar/SideBar"
import { Context } from "../../context/Context"
import "./settings.css"

export default function Settings() {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:3000/images/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            uid: user[0].uid,
            username,
            email,
            password
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilepic = filename;
            try {
                await axios.post("/upload", data);
                
            } catch (err) {
                return;
            }
        }
        try {
            const res = await axios.put("/users/" + user[0].uid, updatedUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
            return;
        }
    };
    return (
        <>
            <div className="settings">
                <div className="settingsWrapper">
                    <div className="settingsTitle">
                        <span className="settingsUpdateTitle">Update Account Details</span>
                        <span className="settingsDeleteTitle">Delete Account</span>
                    </div>
                    <form className="settingsForm" onSubmit={handleSubmit} >
                        <label>Profile Picture</label>
                        <div className="settingsProfilePicture">
                            <img
                                src={file ? URL.createObjectURL(file) : PF+user[0].profilepic}
                                alt=""
                            />
                            <label htmlFor="fileInput">
                                <i className="settingsProfilePictureIcon fa-solid fa-image-portrait"></i>
                            </label>
                            <input type="file" id="fileInput" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])}/>
                        </div>
                        <label>Username</label>
                        <input type="text" placeholder={user[0].username} onChange={e => setUsername(e.target.value)} />
                        <label>Email</label>
                        <input type="email" placeholder={user[0].email} onChange={e => setEmail(e.target.value)} />
                        <label>Password</label>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                        <button className="settingsSubmit" type="submit">Update</button>
                        {success && <span style={{ color: "green" }}>Profile Updated!</span>}
                    </form>
                </div>
                <SideBar />
            </div>
        </>
    )
}