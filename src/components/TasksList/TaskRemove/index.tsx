import React from 'react'
import User from '../../../store/User'
import { ITask } from '../../../types/types'
import MyButton from '../../myComponents/MyButton'
import { localStorgateSetUser } from '../../MyMethods'

interface ITaskRemove {
    id: number;
    tasks: ITask[];
    limit: number;
    setMainCheckState: (arg: boolean) => void;
    setCurrentPage: (num: number) => void;
}

const TaskRemove: React.FC<ITaskRemove> =
    ({ id, tasks, limit, setMainCheckState, setCurrentPage }) => {

        const remove = (id: number) => {
            const question = window.confirm("After press 'Remove' you completely remove your task, are you sure?")

            if (question) {
                const filtered = tasks.filter((task: ITask) => task.id !== id);
                const isChecked = filtered.every((task: ITask) => task.checked === false);
                const save = { ...User.user, tasks: filtered };

                User.saveUserTasks(save);
                localStorgateSetUser(save);
                setMainCheckState(isChecked);
                setCurrentPage(Math.ceil(filtered.length / limit));
            }
        }



        return (
            <div>
                <MyButton width="80px" margin="0" padding="3px 0"
                    onClick={() => remove(id)}
                >Remove</MyButton>
            </div>
        )
    }

export default TaskRemove
