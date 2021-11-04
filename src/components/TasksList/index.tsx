import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import User from '../../store/User';
import { ITask } from '../../types/types';
import Modal from '../Modal/Modal';
import TasksListTitle, { StyledLi } from '../TasksListTitle';
import TasksPagination from '../TasksPaginations';
import TaskIsChecked from './TaskIsChecked';
import TaskOpen from './TaskOpen';
import TaskRemove from './TaskRemove';

const StyledHr = styled.hr`
    margin: 5px 10px;
    background: black;
`

const StyledUl = styled.ul`
    margin: 0;
    padding: 0;
    min-height: 135px;
    button {
    cursor: pointer;
}
`


const TasksList: React.FC = () => {
    const { isModal = User.isModal, searchQuery = User.searchQuery, user = User.user } = User;
    const [outputTasks, setOutputTasks] = useState(user.tasks);
    const [mainCheckState, setMainCheckState] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksLimit, setTasksLimit] = useState(3);

    useEffect(() => {
        const filtered = user.tasks.filter((task: ITask) => task.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setOutputTasks(filtered);
        if (searchQuery) {
            setCurrentPage(1);
        }
    }, [user.tasks, searchQuery, setOutputTasks])


    useEffect(() => {
        if (outputTasks.length) {
            const filtered = outputTasks.filter((task: ITask, ind: number) => (ind >= (currentPage - 1) * tasksLimit && ind < currentPage * tasksLimit));;
            const calcMainStatus = filtered.every((task: ITask) => task.checked === true);
            setMainCheckState(calcMainStatus);
        }
        if (currentPage > outputTasks.length / tasksLimit) {
            setCurrentPage(Math.ceil(outputTasks.length / tasksLimit));
        }
    }, [currentPage, outputTasks, tasksLimit])


    return (
        <>
            {isModal ? <Modal /> : null}
            <StyledUl>
                <TasksListTitle
                    setMainCheckState={setMainCheckState}
                    setOutputTasks={setOutputTasks}
                    mainCheckState={mainCheckState}
                    currentPage={currentPage}
                    tasksLimit={tasksLimit}
                    tasks={outputTasks}
                />
                <StyledHr />
                {outputTasks.map((task: ITask, ind: number) =>
                    (ind >= (currentPage - 1) * tasksLimit && ind < currentPage * tasksLimit)
                        ?
                        <StyledLi key={task.id}>
                            <TaskIsChecked
                                isCheked={task.checked}
                                id={task.id}
                                page={currentPage}
                                limit={tasksLimit}
                                setMainCheckState={setMainCheckState}
                            />
                            <div>{ind + 1}</div>
                            <div>{task.name}</div>
                            <div>{task.status}</div>
                            <TaskOpen id={task.id} />
                            <TaskRemove
                                id={task.id}
                                tasks={outputTasks}
                                limit={tasksLimit}
                                setMainCheckState={setMainCheckState}
                                setCurrentPage={setCurrentPage}
                            />
                        </StyledLi>
                        :
                        null)}
            </StyledUl>
            <TasksPagination
                length={outputTasks.length}
                tasksLimit={tasksLimit}
                setTasksLimit={setTasksLimit}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}

export default observer(TasksList)
