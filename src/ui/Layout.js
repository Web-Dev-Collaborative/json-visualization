import React from 'react';
import styled from 'styled-components';
import Header from 'components/Header';


const Layout = (props) => {
  return (
    <div>
      <Header />
      <Content>
        <Container style={{ maxWidth: props.containerWidth || 500 }}>
        { props.children }
        </Container>
      </Content>
    </div>
  )
}

export default Layout;


const Content = styled.div`
  margin-top: 50px;
  padding: 50px;
`;
const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;
