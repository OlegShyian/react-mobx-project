import { IUser } from "../../types/types";

export const localStorgateSetUser = (user:IUser) => {
    const save = {
        [user.name]: { password: user.password, tasks: user.tasks }
    }
    const getUsers = localStorage.getItem("users") || "{}";
    const users = JSON.parse(getUsers);
    localStorage.setItem("users", JSON.stringify({ ...users, ...save }));
}
