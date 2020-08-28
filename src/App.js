import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { StoreProvider } from 'global/contexts';
import DashboardPage from 'ui/Dashboard';
import UploadPage from 'ui/Upload';


const App = () => {
  return (
    <StoreProvider>
    <Router>
      <Switch>
        <Route exact path="/" component={ DashboardPage } />
        <Route path="/upload" component={ UploadPage } />
      </Switch>
    </Router>
    </StoreProvider>
  )
}

export default App;
