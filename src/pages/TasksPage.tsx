import { observer } from 'mobx-react-lite';
import React from 'react'
import NavTasks from '../components/NavTasks';
import TasksList from '../components/TasksList';
import User from '../store/User';

const TasksPage: React.FC = () => {
    const tasks = User.user.tasks;

    const logOff = () => {
        User.saveIsAuth(false);
    }

    return (
        <div>
            <div className="content__conteiner">
                <button
                    style={{ marginLeft: "auto" }}
                    className="href__button"
                    onClick={logOff}
                >log off</button>
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
