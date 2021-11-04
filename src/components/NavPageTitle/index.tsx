import React from 'react'
import styled from 'styled-components';


const StyledNavBar = styled.nav`
div h1 {
    text-align: center;
    font-size: 48px;
  }
  
div a {
    padding: 5px 10px;
    font-size: 18px;
  }
`

const NavPageTitle: React.FC = () => {

    return (
        <StyledNavBar>
            <div>
                <h1>
                    TODO List Demo App
                </h1>
            </div>
        </StyledNavBar>
    )
}

export default NavPageTitle
