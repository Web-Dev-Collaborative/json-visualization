import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import { StoreContext } from 'global/contexts';
import Layout from 'ui/Layout';
import JSONRenderer from 'components/JSON';
import { Link } from 'react-router-dom';


const Dashboard = (props) => {
  const store = useContext(StoreContext);

  return useObserver( () => {

    // if the json file is not yet uploaded, redirect the user to the upload page!
    if ( ! store.json ) { return <Redirect to="/upload" /> }

    return (
      <Layout>
        <Heading>Dashboard<Link to="/upload">Visualize New File</Link></Heading>
        { store.json &&
          <JSONRenderer json={ toJS(store.json) } matched={ toJS(store.matched) } />
        }
      </Layout>
    )
  })



}

export default Dashboard;

const Heading = styled.div`
  font-size: 30px;
  line-height: 100%;
  display: flex;
  justify-content: space-between;


  a {
    color: #000;
    text-decoration: underline;
    font-size: 20px;
  }

`;
