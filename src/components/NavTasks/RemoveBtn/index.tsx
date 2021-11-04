import React from 'react'
import User from '../../../store/User'
import { ITask } from '../../../types/types';
import MyButton from '../../myComponents/MyButton';
import { localStorgateSetUser } from '../../MyMethods';

interface IRemove { remove: string[], saved: ITask[] }


const RemoveBtn: React.FC = () => {
    const { user = User.user } = User;

    const handleRemoveAllChecked = () => {
        const { remove, saved } = user.tasks.reduce((accum: IRemove, task: ITask) => task.checked
            ? { ...accum, remove: [...accum.remove, task.name] }
            : { ...accum, saved: [...accum.saved, task] },
            { remove: [], saved: [] })

        const question = window.confirm(`After press 'OK' you completely remove your tasks: { ${remove} }, are you sure?`)

        if (question) {
            const save = { ...user, tasks: saved };
            User.saveUserTasks(save);
            localStorgateSetUser(save);
        }
    }

    return (
        <MyButton
            onClick={handleRemoveAllChecked}
        >
            remove &#10004;
        </MyButton>
    )
}

export default RemoveBtn
