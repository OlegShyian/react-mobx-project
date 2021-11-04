import React from 'react'
import FlexWrapper from '../components/myComponents/FlexWrapper'
import MyLink from '../components/myComponents/MyLink'


const StartPage: React.FC = () => {
    return (
        <FlexWrapper
            direction="column"
            minHeight="300px"
            height="50vh"
        >
            <h1>Hellow it is start pages for "Todo" application.</h1>
            <MyLink to="/login">login</MyLink>
            <h2>If you are a new user put the "register" button</h2>
            <MyLink to="/registration">registration</MyLink>
        </FlexWrapper>
    )
}

export default StartPage
