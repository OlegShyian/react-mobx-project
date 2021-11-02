import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import User from '../../store/User';
import { ITask } from '../../types/types';
import "./style.css"

interface ITitleProps {
    setOutputTasks: (arg: any[]) => void;
    mainCheckState: boolean;
    setMainCheckState: (arg: boolean) => void;
    currentPage: number;
    tasksLimit: number;
}

const TasksListTitle: React.FC<ITitleProps> = ({
    setMainCheckState,
    mainCheckState,
    setOutputTasks,
    currentPage,
    tasksLimit }) => {

    const { user = User.user } = User;
    const [sortDirName, setSortDirName] = useState(1);
    const [sortDirStatus, setSortDirStatus] = useState(1);

    const handleChangeMainCheckStatus = () => {
        const save = user.tasks.map((task: ITask, ind: number) =>
            (ind >= (currentPage - 1) * tasksLimit && ind < currentPage * tasksLimit)
                ? ({ ...task, checked: !mainCheckState })
                : task);
        User.saveUserTasks({ ...user, tasks: save })
        setMainCheckState(!mainCheckState);
    }

    const sortTasks = (field: string) => {
        let dir = 1;
        if (field === "name") {
            dir = sortDirName;
            setSortDirName(sortDirName * -1);
        }
        if (field === "status") {
            dir = sortDirStatus;
            setSortDirStatus(sortDirStatus * -1);
        }

        return (a: any, b: any) => {
            if (a[field] > b[field]) return 1 * dir;
            if (a[field] < b[field]) return -1 * dir;
            return 0;
        }
    }

    const handlerSort = (field: string) => {
        setOutputTasks(user.tasks.sort(sortTasks(field)));
        User.saveUserTasks({ ...user, tasks: user.tasks.sort(sortTasks(field)) });
    }

    return (
        <>
            <li className="list__titles">
                <div className="title__first__element">
                    <input
                        type="checkbox"
                        checked={mainCheckState}
                        onChange={handleChangeMainCheckStatus}
                    />
                </div>
                <div>#</div>
                <div
                    className="title_name"
                    onClick={() => handlerSort("name")}
                >Task Name</div>
                <div
                    className="title_status"
                    onClick={() => handlerSort("status")}
                >Status</div>
                <div>Edit</div>
                <div>Remove</div>
            </li>

        </>
    )
}

export default observer(TasksListTitle)
