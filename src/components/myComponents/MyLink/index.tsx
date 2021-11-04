import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface ILinkProps{
    to: string;
    children: string;
}

const StyledLink = styled(Link)`
    text-decoration: none;
    display: inline-block;
    color: white;
    padding: 5px;
    margin: 5px 10px;
    border-radius: 10px;
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
    background-image: linear-gradient(to right, #9EEFE1 0%, #4830F0 51%, #9EEFE1 100%);
    background-size: 200% auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, .1);
    transition: .5s;
    cursor: pointer;
    outline: none;
    width: 170px;
    box-sizing: border-box;
    text-align: center;
    :hover {
        background-position: right center;
    }
`

const MyLink: React.FC<ILinkProps> = (props) => <StyledLink {...props}/>;

export default MyLink
