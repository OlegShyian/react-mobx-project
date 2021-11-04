import React from 'react'
import styled from 'styled-components'

interface IFlex {
    justify?: string;
    align?: string;
    height?: string;
    width?: string;
    padding?: string;
    margin?: string;
    background?: string;
    minHeight?: string;
    direction?: string;
}

const StyledDiv = styled.div<IFlex>`
    display: flex;
    flex-direction: ${props => props.direction || "row"};
    justify-content: ${props => props.justify || "space-between"};
    align-items: ${props => props.align || "center"};
    height: ${props => props.height || "auto"};
    width: ${props => props.width || "auto"};
    padding: ${props => props.padding || "0"};
    margin: ${props => props.margin || "0"};
    background: ${props => props.background || "inherit"};
    min-height: ${props => props.minHeight || "auto"};
`

const FlexWrapper:React.FC<IFlex> = (props) => <StyledDiv {...props}/>

export default FlexWrapper
