import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import styled from 'styled-components';
import User from '../../store/User';
import { ITask } from '../../types/types';
import MyInput from '../myComponents/MyInput';
import { localStorgateSetUser } from '../MyMethods';


export const StyledLi = styled.li`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px 10px;
    box-sizing: border-box;
    background: #f3f3f3;
    word-wrap: break-word;
    div {
        width: 15%;
        text-align: center;
    }
    div:first-child{
        width: 5%;
    }
`

const StyledDiv = styled.div`
    cursor: pointer;
`

interface ITitleProps {
    setOutputTasks: (arg: any[]) => void;
    mainCheckState: boolean;
    setMainCheckState: (arg: boolean) => void;
    currentPage: number;
    tasksLimit: number;
    tasks:ITask[]
}

const TasksListTitle: React.FC<ITitleProps> = ({
    setMainCheckState,
    mainCheckState,
    setOutputTasks,
    currentPage,
    tasksLimit,
    tasks }) => {

    const handleChangeMainCheckStatus = () => {
        const saveTasks = tasks.map((task: ITask, ind: number) =>
            (ind >= (currentPage - 1) * tasksLimit && ind < currentPage * tasksLimit)
                ? ({ ...task, checked: !mainCheckState })
                : task);
        const userSave = { ...User.user, tasks: saveTasks };

        setMainCheckState(!mainCheckState);
        User.saveUserTasks(userSave);
        localStorgateSetUser(userSave);
    }

    const [sortDirName, setSortDirName] = useState(1);
    const [sortDirStatus, setSortDirStatus] = useState(1);

    const getDir = (field: string) => {
        if (field === "name") {
            setSortDirName(sortDirName * -1);
            return sortDirName;
        }
        if (field === "status") {
            setSortDirStatus(sortDirStatus * -1);
            return sortDirStatus;
        }
    }

    const sortTasks = (field: string) => {
        const dir = getDir(field) || 1;
        return (a: any, b: any) => {
            if (a[field] > b[field]) return 1 * dir;
            if (a[field] < b[field]) return -1 * dir;
            return 0;
        }
    }
    
    const handlerSort = (field: string) => {
        const sorted = tasks.sort(sortTasks(field));
        const save = { ...User.user, tasks: sorted };

        setOutputTasks(sorted);
        User.saveUserTasks(save);
        localStorgateSetUser(save);
    }

    return (
        <>
            <StyledLi>
                <div>
                    <MyInput
                        type="checkbox"
                        checked={mainCheckState}
                        onChange={handleChangeMainCheckStatus}
                    />
                </div>
                <div>#</div>
                <StyledDiv
                    onClick={() => handlerSort("name")}
                >Task Name</StyledDiv>
                <StyledDiv
                    onClick={() => handlerSort("status")}
                >Status</StyledDiv>
                <div>Edit</div>
                <div>Remove</div>
            </StyledLi>

        </>
    )
}

export default observer(TasksListTitle)
