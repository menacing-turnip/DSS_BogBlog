import "./write.css"

export default function Write() {
    return (
        <>
            <div className="write">
                <img className="writeImage"
                    src="https://images.pexels.com/photos/7206581/pexels-photo-7206581.jpeg?cs=srgb&dl=pexels-tima-miroshnichenko-7206581.jpg&fm=jpg"
                    alt=""
                />
                <form className="writeForm">
                    <div className="writeFormGroup">
                        <label htmlFor="fileInput">
                            <i className="writeIcon fa-solid fa-file-image"></i>
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                        />
                        <input
                            type="text"
                            placeholder="Enter a title..."
                            className="writeInput"
                            autoFocus={true}
                        />
                    </div>
                    <div className="writeFormGroup">
                        <textarea
                            placeholder="Write a blog post..."
                            type="text"
                            className="writeInput writeText">
                        </textarea>
                    </div>
                    <button className="writeSubmit">Submit Post</button>
                </form>
            </div>
        </>
    )
}