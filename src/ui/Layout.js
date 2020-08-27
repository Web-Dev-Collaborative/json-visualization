import React from 'react';
import styled from 'styled-components';
import Header from 'components/Header';


const Layout = (props) => {
  return (
    <div>
      <Header />
      <Content>
        { props.children }
      </Content>
    </div>
  )
}

export default Layout;


const Content = styled.div`
  margin-top: 50px;
  padding: 50px;
`;
