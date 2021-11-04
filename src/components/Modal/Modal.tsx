import React from 'react'
import styled from 'styled-components'
import TaskForm from '../TaskForm/TaskForm'


const StyledModal = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0, 0.4);
`


const Modal: React.FC = () => {
    return (
        <StyledModal>
            <TaskForm/>
        </StyledModal>
    )
}

export default Modal
