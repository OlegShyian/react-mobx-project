import React , {MouseEvent} from 'react'
import User from '../../../store/User'
import { ITask } from '../../../types/types'
import FlexWrapper from '../../myComponents/FlexWrapper'
import MyButton from '../../myComponents/MyButton'
import { localStorgateSetUser } from '../../MyMethods'

interface ITaskFormBtns {
    taskName: string;
    taskStatus: string;
    resetValues: () => void;
    btnName: string
}



const TaskFormBtns: React.FC<ITaskFormBtns> = ({
    taskName,
    taskStatus,
    resetValues,
    btnName }) => {

    const user = User.user;
    const tasks = user.tasks;

    const editTasks = (taskName: string, taskStatus: string) => {
        return tasks.map((task: ITask) => task.id === User.editedTask.id
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
            if (btnName === "Save") {
                const result = editTasks(taskName, taskStatus);
                User.saveUserTasks({ ...user, tasks: result });
                localStorgateSetUser({ ...user, tasks: result });
                User.saveEditedTask({ name: "", status: "", id: 0, checked: false });
            } else {
                const save = {
                    ...user, tasks: [{
                        name: taskName,
                        status: taskStatus,
                        id: Date.now(),
                        checked: false
                    }, ...tasks]
                }
                User.saveUserTasks(save);
                localStorgateSetUser(save);
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
    return (
        <FlexWrapper width="80%" justify="space-between" margin="15px 0 0 0">
            <MyButton margin="5px 0" onClick={handleCancel}>Cancel</MyButton>
            <MyButton margin="5px 0" onClick={handleSetTask}>{btnName}</MyButton>
        </FlexWrapper>
    )
}

export default TaskFormBtns
