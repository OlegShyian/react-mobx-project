import { observer } from 'mobx-react-lite';
import React, { MouseEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import User from '../store/User';
import "./style.css";


const RegistrationPage: React.FC = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (!localStorage.getItem("users")) {
            localStorage.setItem("users", JSON.stringify({}));
        }
    }, []);

    const addNewUser = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!user || !password) return alert("Login and password fields cannot be empty");
        const storage: any = localStorage.getItem("users");
        const users = JSON.parse(storage);

        if (users[user]) {
            alert("User is already register");
        } else {
            const newUser = { [user]: { password: password, tasks: [] } };
            localStorage.setItem("users", JSON.stringify({ ...users, ...newUser }));
            User.saveIsAuth(true);
            User.saveUserTasks({
                name: user,
                password: password,
                tasks: []
            });
            setUser("");
            setPassword("");
        }
    }

    return (
        <div className="login__page">
            <form className="login_form">
                <h1>Registration</h1>
                <input
                    value={user}
                    type="text"
                    placeholder="name"
                    onChange={(e) => setUser(e.target.value)}
                />
                <input
                    value={password}
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="href__button" onClick={(e) => addNewUser(e)}>registration</button>
                <Link className="href__button" to="/start">Start Page</Link>
            </form>
        </div>
    )
}

export default observer(RegistrationPage)
