import "./post.css"
import { Link } from 'react-router-dom';

export default function Post({ post }) {
    console.log(post);
    console.log(post.username);
    return (
        <div className="post">
            {post.photo && (
                <img
                    className="postImage"
                    src={post.photo}
                    alt=""
                />
            )}
            <div className="postInfo">
                <div className="postCategories">
                   
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