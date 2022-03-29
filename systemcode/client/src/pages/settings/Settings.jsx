import SideBar from "../../components/sidebar/SideBar"
import "./settings.css"

export default function Settings() {
    return (
        <>
            <div className="settings">
                <div className="settingsWrapper">
                    <div className="settingsTitle">
                        <span className="settingsUpdateTitle">Update Account Details</span>
                        <span className="settingsDeleteTitle">Delete Account</span>
                    </div>
                    <form className="settingsForm">
                        <label>Profile Picture</label>
                        <div className="settingsProfilePicture">
                            <img
                                src="https://images.pexels.com/photos/4584193/pexels-photo-4584193.jpeg?cs=srgb&dl=pexels-ketut-subiyanto-4584193.jpg&fm=jpg"
                                alt=""
                            />
                            <label htmlFor="fileInput">
                                <i className="settingsProfilePictureIcon fa-solid fa-image-portrait"></i>
                            </label>
                            <input type="file" id="fileInput" style={{ display: "none" }}/>
                        </div>
                        <label>Username</label>
                        <input type="text" placeholder="BoG_GoD" />
                        <label>Email</label>
                        <input type="email" placeholder="bog_god@gmail.co.uk" />
                        <label>Password</label>
                        <input type="password" />
                        <button className="settingsSubmit">Update</button>
                    </form>
                </div>
                <SideBar />
            </div>
        </>
    )
}