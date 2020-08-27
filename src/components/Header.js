import React from 'react';
import styled from 'styled-components';


const HeaderComponent = (props) => {
  return (
    <Header>
      <AppName>JSONPath Visualizer</AppName>
    </Header>
  )
}

export default HeaderComponent;

const Header = styled.header`
  position: fixed;
  height: 50px;
  background-color: #FFF;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 7px;
  z-index: 100;
  transition: all .3s ease;

  &::after {
    content: '';
    background: radial-gradient(farthest-side at 50% 0%, rgba(36, 18, 77, 0.3), rgba(36, 18, 77, 0.05)) 0 0;
    height: 6px;
    left: 0;
    position: absolute;
    right: 0;
    transition: opacity 250ms cubic-bezier(.2, .45, 0, 1);
    width: 100%;
  }

`;


const AppName = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 50px;
  cursor: default;
  a {
    color: #000;
    text-decoration: none;
  }
  &.active { color: #000;  }
`;
