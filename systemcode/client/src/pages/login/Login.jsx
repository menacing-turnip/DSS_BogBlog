import { Link } from "react-router-dom"
import "./login.css"

export default function Login() {
    return (
        <>
            <div className="login">
                <span className="loginTitle">User Authentication</span>
                <form className="loginForm">
                    <label>Email</label>
                    <input type="text" className="loginInput" placeholder="Enter email/username..." />
                    <label>Password</label>
                    <input type="password" className="loginInput" placeholder="Enter password..." />
                    <button className="loginButton">
                        <Link className="link" to="/login">Login</Link>
                    </button>
                </form>
                <p>or</p>
                <button className="loginRegisterButton">
                    <Link className="link" to="/register">Register</Link>
                </button>
            </div>
        </>
    )
}