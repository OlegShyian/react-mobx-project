import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import User from '../../store/User';
import { ITask } from '../../types/types';
import Modal from '../Modal/Modal';
import FlexWrapper from '../myComponents/FlexWrapper';
import MyButton from '../myComponents/MyButton';
import MyInput from '../myComponents/MyInput';
import RemoveBtn from './RemoveBtn';



const NavTasks: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const {user = User.user, isRemoveBtn = User.isRemoveBtn} = User;

    useEffect(() => {
        const timer = setTimeout(() => {
            User.saveSearchQuery(searchQuery);
        }, 1000)
        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        const isRemove = user.tasks.some((task: ITask) => task.checked);
        User.saveRemoveStatusBtn(isRemove);
    }, [user.tasks])

    const openForm = () => {
        User.saveIsModal(true);
        User.saveBtnName("Create");
    }


    return (
        <FlexWrapper height="50px">
            <div>
                {isRemoveBtn ? <RemoveBtn /> : null}
            </div>
            <FlexWrapper justify="flex-end">
                {User.isModal ? <Modal /> : null}
                <MyInput
                    type="text"
                    placeholder="Seach in the tasks..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <MyButton onClick={openForm}>Add Task</MyButton>
            </FlexWrapper>
        </FlexWrapper>
    )
}

export default observer(NavTasks)
