import React from 'react'
import User from '../../../store/User';
import { ITask } from '../../../types/types';
import MyInput from '../../myComponents/MyInput'
import { localStorgateSetUser } from '../../MyMethods';

interface ITaskCheckProps {
    setMainCheckState: (arg: boolean) => void;
    isCheked: boolean;
    id: number;
    page: number;
    limit: number;
}

const TaskIsChecked: React.FC<ITaskCheckProps> =
    ({ isCheked, id, setMainCheckState, page, limit }) => {

        const handleChangeTaskChecked = (id: number) => {
            const editedTasks = User.user.tasks.map((task: ITask) => task.id === id
                ? { ...task, checked: !task.checked }
                : task);
            const tasksOnPage = editedTasks.filter((task: ITask, ind: number) =>
                (ind >= (page - 1) * limit && ind < page * limit));
            const calcMainStatus = tasksOnPage.every((task: ITask) => task.checked === true);
            const save = { ...User.user, tasks: editedTasks };
            setMainCheckState(calcMainStatus);
            User.saveUserTasks(save);
            localStorgateSetUser(save);
        }

        return (
            <div>
                <MyInput
                    type="checkbox"
                    checked={isCheked}
                    onChange={() => handleChangeTaskChecked(id)}
                />
            </div>
        )
    }

export default TaskIsChecked
