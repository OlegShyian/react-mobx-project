import React from 'react'
import styled from 'styled-components'


interface IButtonProps {
    onClick: (arg?:any) => void;
    children: string;
    margin?: string;
    padding?: string;
    width?: string;
}

const StyledButton = styled.button<IButtonProps>`
    margin: ${props => props.margin || "10px"};
    padding: ${props => props.padding || "5px 0"};
    width: ${props => props.width || "100px"};
    text-decoration: none;
    display: inline-block;
    color: white;
    border-radius: 10px;
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    background-image: linear-gradient(to right, #9EEFE1 0%, #4830F0 51%, #9EEFE1 100%);
    background-size: 200% auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, .1);
    transition: .5s;
    cursor: pointer;
    outline: none;
    box-sizing: border-box;
    text-align: center;

    :hover{
        background-position: right center;
    }
`


const MyButton: React.FC<IButtonProps> = (props) => <StyledButton {...props}/>

export default MyButton
