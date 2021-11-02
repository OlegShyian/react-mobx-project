import { observer } from 'mobx-react-lite';
import React, { MouseEvent, useEffect, useState } from 'react'
import User from '../../store/User';
import { ITask } from '../../types/types';
import "./style.css"



const TaskForm: React.FC = () => {
    const { user = User.user, editedTask = User.editedTask, taskFormConfBtnName = User.taskFormConfBtnName } = User;
    const [taskName, setTaskName] = useState("");
    const [taskStatus, setTaskStatus] = useState("");
    const tasks = user.tasks;

    useEffect(() => {
        if (taskFormConfBtnName === "Save") {
            setTaskName(editedTask.name);
            setTaskStatus(editedTask.status);
        }
    }, [taskFormConfBtnName, editedTask])

    const editTasks = (taskName: string, taskStatus: string) => {
        return tasks.map((task: ITask) => task.id === editedTask.id
            ? ({
                name: taskName,
                status: taskStatus,
                id: task.id,
                checked: task.checked
            })
            : task);
    }

    const handleSetTask = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (taskName && taskStatus) {
            if (taskFormConfBtnName === "Save") {
                const result = editTasks(taskName, taskStatus);
                User.saveUserTasks({ ...user, tasks: result });
                User.saveEditedTask({ name: "", status: "", id: 0, checked: false });
            } else {
                User.saveUserTasks({
                    ...user,
                    tasks: [{
                        name: taskName,
                        status: taskStatus,
                        id: Date.now(),
                        checked: false
                    }, ...tasks]
                });
            }
            resetValues();
        } else {
            const emptyField = !taskName ? "Name" : "Task";
            alert(`Field ${emptyField} is empty`)
        }
    }

    const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        resetValues();
    }

    const resetValues = () => {
        setTaskName("");
        setTaskStatus("");
        User.saveIsModal(false);
    }

    return (
        <form className={"form"}>
            <h2>Add new Task</h2>
            <div className={"form__content"}>
                <div className={"form__input"}>
                    <strong>Enter task name</strong>
                    <input
                        value={taskName}
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                </div>
                <div className={"form__input"}>
                    <strong>Choose status</strong>
                    <select
                        required
                        value={taskStatus}
                        onChange={(e) => setTaskStatus(e.target.value)}
                    >
                        <option value=""></option>
                        <option value="Todo">Todo</option>
                        <option value="In progress">In progress</option>
                        <option value="Comleted">Comleted</option>
                    </select>
                </div>
            </div>
            <div className={"form__button"}>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleSetTask}>{taskFormConfBtnName}</button>
            </div>
        </form>
    )
}

export default observer(TaskForm);
