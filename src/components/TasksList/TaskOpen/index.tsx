import React from 'react'
import User from '../../../store/User';
import { ITask } from '../../../types/types';
import MyButton from '../../myComponents/MyButton'

interface ITaskOpen {
    id: number;
}

const TaskOpen: React.FC<ITaskOpen> = ({id}) => {

    const openCurenTask = (id: number) => {
        const task = User.user.tasks.find((task: ITask) => task.id === id) || { name: "", status: "", id: 0, checked: false };

        User.saveEditedTask(task);
        User.saveIsModal(true);
        User.saveBtnName("Save");
    }

    return (
        <div>
            <MyButton width="80px" margin="0" padding="3px 0"
                onClick={() => openCurenTask(id)}
            >Edit</MyButton>
        </div>
    )
}

export default TaskOpen
