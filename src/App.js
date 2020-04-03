import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';

import { Switch, Route } from 'react-router';
import Dashboard from './pages/dashboard';
import Index from './pages';
import { BrowserRouter } from 'react-router-dom';
import Initialize from './pages/initialize';
import Report from './pages/report';
import Header from './components/header';


function App() {
  return (
    <Container fluid >
      <Header></Header>
      <Container>
        <BrowserRouter>
          <Switch>
            <Route exact path="/"><Index /></Route>
            <Route path="/dashboard"><Dashboard /></Route>
            <Route path="/initialize"><Initialize /></Route>
            <Route path="/report"><Report /></Route>
          </Switch>
        </BrowserRouter>
      </Container>
    </Container>
  );
}

export default App;
