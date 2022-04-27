import "./header.css"

export default function Header() {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitle">The Bog Blog</span>
                <span className="headerSubtitle">A Cesspit of Opinion</span>
            </div>
            <img className="headerImage"
                src="https://images.pexels.com/photos/2768961/pexels-photo-2768961.jpeg?cs=srgb&dl=pexels-leonid-danilov-2768961.jpg&fm=jpg"
                alt=""
            />
        </div>
    )
}