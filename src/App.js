import './App.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

import AppHeader from './components/common/header';
import AppFooter from './components/common/footer';
import AppHome from './views/home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginForm from './components/login/LoginForm';
import { useEffect, useState } from 'react';
import Sub from './components/common/submenu';
import Background from '../src/assets/images/bg-color.jpg';
const { Header, Content, Footer } = Layout;

function App() {
  const [token, setToken] = useState(false);
  useEffect(() => {
    const key = localStorage.getItem("token")
    if (key) {
      setToken(true)
    }
  }, [])
  if (token === false) {
    return <LoginForm setToken={setToken} />
  } else return (


    <Router>
      <Layout className="mainLayout">
        <Header>
          <AppHeader setToken={setToken} />
        </Header>
        <Content>

          <Switch>
            <Route exact path='/' render={() => {
              return (
                <div>
                  <AppHome />
                  <Footer>
                    <AppFooter />
                  </Footer>
                </div>
              )
            }} />
            <Route path="/login" component={LoginForm} />
            <Route exact path='/sub-menu' render={() => {
              return (
                <Sub />
              )
            }} />
          </Switch>
        </Content>
        {/* <Footer>
          <AppFooter />
        </Footer> */}
      </Layout>
    </Router>

  );
}

export default App;
