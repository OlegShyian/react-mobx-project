import { observer } from 'mobx-react-lite'
import { MouseEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import User from '../store/User'
import "./style.css"

const LoginPage: React.FC = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");


    const checkLogin = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const storage: any = localStorage.getItem("users");
        const users = JSON.parse(storage);
        
        
        if (users[user]) {
            if (users[user].password === password) {
                User.saveIsAuth(true);
                User.saveUserTasks({
                    name: user,
                    password:password,
                    tasks: users[user].tasks
                });
            } else {
                return alert("Login or password is incorrect");
            }
        } else {
            return alert("Login or password is incorrect");
        }
        setUser("");
        setPassword("");
    }

    return (
        <div className="login__page">
            <form className="login_form">
                <h1 style={{ textAlign: "center" }}>Please enter <br />name and password</h1>
                <input
                    value={user}
                    type="text"
                    placeholder="login"
                    onChange={(e) => setUser(e.target.value)}
                />
                <input
                    value={password}
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="href__button" onClick={(e) => checkLogin(e)}>log on</button>
                <Link className="href__button" to="/registration">registration</Link>
            </form>
        </div>
    )
}

export default observer(LoginPage)
