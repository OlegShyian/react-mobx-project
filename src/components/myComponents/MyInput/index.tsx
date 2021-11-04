import React from 'react'
import styled from 'styled-components'

interface IProps {
    onChange: (arg: any) => void;
    type: string;
    placeholder?: string;
    checked?: boolean;
    padding?: string;
    margin?: string;
    value?: string;
}

const StyledInput = styled.input<IProps>`
    padding: ${props => props.padding || "2px 3px"};
    margin: ${props => props.margin || "4px 6px"};
`

const MyInput: React.FC<IProps> = (props) => {
    return (
        <StyledInput {...props} />
    )
}

export default MyInput
