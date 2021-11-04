import React from 'react'
import styled from 'styled-components'

interface IForm {
    children: any;
    width?: string;
    direction?: string;
    padding?: string;
}

const StyledForm = styled.form<IForm>`
    display: flex;
    flex-direction: ${({direction}) => direction || "column"};
    align-items: center;
    padding: ${({padding}) => padding || "10px 15px"};
    width: ${({width}) => width || "auto"};
    border: 3px solid black;
    border-radius: 30px;
    user-select: none;
    background: white;
`

const MyForm: React.FC<IForm> = (props) => <StyledForm {...props}/>

export default MyForm
