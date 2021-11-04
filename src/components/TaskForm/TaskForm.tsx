import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import User from '../../store/User';
import FlexWrapper from '../myComponents/FlexWrapper';
import MyForm from '../myComponents/MyForm';
import MyInput from '../myComponents/MyInput';
import TaskFormBtns from './TaskFormBtns';


const TaskForm: React.FC = () => {
    const { editedTask = User.editedTask, taskFormConfBtnName = User.taskFormConfBtnName } = User;
    const [taskName, setTaskName] = useState("");
    const [taskStatus, setTaskStatus] = useState("");

    useEffect(() => {
        if (taskFormConfBtnName === "Save") {
            setTaskName(editedTask.name);
            setTaskStatus(editedTask.status);
        }
    }, [taskFormConfBtnName, editedTask])

    const resetValues = () => {
        setTaskName("");
        setTaskStatus("");
        User.saveIsModal(false);
    }


    return (
        <MyForm padding="15px" width="400px">
            <h2>Add new Task</h2>
            <FlexWrapper width="80%" justify="space-between">
                <FlexWrapper direction="column">
                    <strong>Enter task name</strong>
                    <MyInput
                        padding="0"
                        margin="0"
                        value={taskName}
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                </FlexWrapper>
                <FlexWrapper direction="column">
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
                </FlexWrapper>
            </FlexWrapper>
            <TaskFormBtns
                taskName={taskName}
                taskStatus={taskStatus}
                resetValues={resetValues}
                btnName={taskFormConfBtnName}
            />

        </MyForm>
    )
}

export default observer(TaskForm);
