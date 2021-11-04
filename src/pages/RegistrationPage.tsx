import { observer } from 'mobx-react-lite';
import React, { MouseEvent, useEffect, useState } from 'react';
import FlexWrapper from '../components/myComponents/FlexWrapper';
import MyButton from '../components/myComponents/MyButton';
import MyForm from '../components/myComponents/MyForm';
import MyInput from '../components/myComponents/MyInput';
import MyLink from '../components/myComponents/MyLink';
import User from '../store/User';


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
        <FlexWrapper justify="center" height="50vh">
            <MyForm>
                <h1>Registration</h1>
                <MyInput
                    value={user}
                    type="text"
                    placeholder="name"
                    onChange={(e) => setUser(e.target.value)}
                />
                <MyInput
                    value={password}
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <MyButton width="170px" onClick={(e) => addNewUser(e)}>registration</MyButton>
                <MyLink to="/start">Start Page</MyLink>
            </MyForm>
        </FlexWrapper>
    )
}

export default observer(RegistrationPage)
