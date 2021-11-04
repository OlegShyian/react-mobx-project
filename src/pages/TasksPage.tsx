import { observer } from 'mobx-react-lite';
import React from 'react'
import NavTasks from '../components/NavTasks';
import TasksList from '../components/TasksList';
import User from '../store/User';
import 'styled-components/macro';
import MyButton from '../components/myComponents/MyButton';
import FlexWrapper from '../components/myComponents/FlexWrapper';


const TasksPage: React.FC = () => {
    const tasks = User.user.tasks;

    const logOff = () => {
        User.saveIsAuth(false);
    }

    return (
        <div >
            <div>
                <FlexWrapper >
                    <MyButton
                        margin="0 10px 0 auto"
                        onClick={logOff}
                    >log off</MyButton>
                </FlexWrapper>
                <NavTasks />
                {tasks.length
                    ?
                    <TasksList />
                    :
                    <h1 style={{ textAlign: "center" }}>Завдань немає</h1>
                }
            </div>
        </div>
    )
}

export default observer(TasksPage);
