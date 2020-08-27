import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
// import styled from 'styled-components';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import { StoreContext } from 'contexts';
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
        <h1 style={{ fontSize: 30 }}>Dashboard | <Link to="/upload">Upload File</Link></h1>
        { store.json &&
          <JSONRenderer json={ toJS(store.json) } matched={ toJS(store.matched) } />
        }
      </Layout>
    )
  })



}

export default Dashboard;
