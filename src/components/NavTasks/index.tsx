import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import User from '../../store/User';
import { ITask } from '../../types/types';
import Modal from '../Modal/Modal';
import "./style.css"

interface IRemove {remove: string[], saved: ITask[] }

const NavTasks: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const {isRemoveBtn = User.isRemoveBtn, user = User.user, isModal = User.isModal} = User;

    useEffect(() => {
        const timer = setTimeout(() => {
            User.saveSearchQuery(searchQuery);
        }, 1000)
        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        const isRemove = user.tasks.some((task: ITask) => task.checked);
        User.saveRemoveStatusBtn(isRemove);
    }, [user.tasks])

    const handleRemoveAllChecked = () => {
        const { remove, saved } = user.tasks.reduce((accum: IRemove, task: ITask) => task.checked
            ? { ...accum, remove: [...accum.remove, task.name] }
            : { ...accum, saved: [...accum.saved, task] },
            { remove: [], saved: [] })

        const question = window.confirm(`After press 'OK' you completely remove your tasks: { ${remove} }, are you sure?`)

        if (question) {
            User.saveUserTasks({...user, tasks: saved});
            const save = {
                [user.name]: { password: user.password, tasks: saved }
            }
            const getUsers = localStorage.getItem("users") || "{}";
            const users = JSON.parse(getUsers);
            localStorage.setItem("users", JSON.stringify({ ...users, ...save }));
        }
    }


    return (
        <div className="wrapper__tasks_navigation">
            <div>
                {isRemoveBtn
                    ?
                    <button
                        onClick={handleRemoveAllChecked}
                        className="remove__button"
                    >remove &#10004;</button>
                    :
                    null}
            </div>
            <div className="tasks__navigation">
                {isModal ? <Modal /> : null}
                <input
                    type="text"
                    placeholder="Seach in the tasks..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    className="btn__addTask"
                    onClick={() => {
                        User.saveIsModal(true);
                        User.saveBtnName("Create");
                    }}
                >Add Task</button>
            </div>
        </div>
    )
}

export default observer(NavTasks) 
