import "./post.css"
import { Link } from 'react-router-dom';

export default function Post({ post }) {
    const PF = "http://localhost:5000/images/";
    return (
        <div className="post">
            {post.photo && (
                <img
                    className="postImage"
                    src={PF + post.photo}
                    alt=""
                />
            )}
            <div className="postInfo">
                <div className="postCategories">
                    {/*NO SUCH THING AS IF-ELSE STATEMENT IN JSX \/ THE TURGID HORROR SHOW DOWN THERE IS THE SYNTAX FOR A CONDITIONAL*/}
                    {
                        post.categories !== null
                        ? post.categories.map(c => (<span className="postCategory">{c.name}</span>))
                        : <span className="postCategory"></span>
                    }
                    {/*{post.categories.map(c => (<span className="postCategory">{c.name}</span>))}*/}
                </div>
                <Link to={`/post/${post.pid}`} className="link">
                    <span className="postTitle">{post.title}</span>
                </Link>
                
                <hr />
                <span className="postDate">
                    {new Date(post.published_on).toDateString()}
                </span>
                <p className="postDescription">
                    {post.description}
                </p>
            </div>
        </div>
    )
}