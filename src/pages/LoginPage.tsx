import { observer } from 'mobx-react-lite'
import { MouseEvent, useState } from 'react'
import FlexWrapper from '../components/myComponents/FlexWrapper'
import MyButton from '../components/myComponents/MyButton'
import MyForm from '../components/myComponents/MyForm'
import MyInput from '../components/myComponents/MyInput'
import MyLink from '../components/myComponents/MyLink'
import User from '../store/User'


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
                    password: password,
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
        <FlexWrapper justify="center" height="50vh">
            <MyForm>
                <h1 style={{ textAlign: "center" }}>Please enter <br />name and password</h1>
                <MyInput
                    value={user}
                    type="text"
                    placeholder="login"
                    onChange={(e) => setUser(e.target.value)}
                />
                <MyInput
                    value={password}
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <MyButton width="170px" onClick={(e) => checkLogin(e)}>log on</MyButton>
                <MyLink to="/registration">registration</MyLink>
            </MyForm>
        </FlexWrapper>
    )
}

export default observer(LoginPage)
