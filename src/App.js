import './App.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

import AppHeader from './components/common/header';
import AppFooter from './components/common/footer';
import AppHome from './views/home';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom'
import LoginForm from './components/login/LoginForm';
import { useEffect, useState } from 'react';
import Sub from './components/common/submenu';
import Background from '../src/assets/images/bg-color.jpg';
import { ClientRequest } from 'http';
import { P } from '@antv/g2plot';
import axios from 'axios';
const { Header, Content, Footer } = Layout;

function App(props) {

  const clientId = "1dcleodlcaoodkc123";
  const ssoURL = "http://sso.ai2c.asia/org/authentication?clientid="
  const tokenInfoUrl = "https://sso.ai2c.asia/org/authentication/Authenticate?token=";
  // const baseUrl = "http://localhost:3000"
  const baseUrl = "https://ktxh.ai2c.asia/"
  const [ssoToken, setSsoToken] = useState(false)
  const [isExpire, setIsExpire] = useState(true)

  console.log(props)
  
  // fetchTokenInfo = () => {
  //   axios.get(`${tokenInfoUrl}${token}`).then((res) => {
  //     console.log(res.data)
  //   })
  // }

  useEffect(() => {
    let token = localStorage.getItem("token")

    if (token) {
      console.log(token)
      setSsoToken(token)
      return
    }

    let params = window.location.search
    let paramsObj = new URLSearchParams(params.slice(1,))

    token = paramsObj.get('token')
    if (!token) {
      console.log(process.env.REACT_APP_API_URL)
      window.location.assign(`${ssoURL}${clientId}&returnUrl=${baseUrl}`)
    } else {
      localStorage.setItem("token", token)
      setSsoToken(token)
      window.location.assign(baseUrl)
    }

  }, [])
  // if (ssoToken === false) {
  //   return <LoginForm setToken={setToken} />
  // } else 
  return (

    <Router>
      <Switch>
        <Route exact path='/' render={() => {
          return (ssoToken == false) ? <LoginForm /> : (<MainApp setSsoToken={setSsoToken} />)
        }} />
        <Route path='/sub-menu' render={() => {
          return (ssoToken === false) ? <LoginForm /> : (
            <SubMenu setSsoToken={setSsoToken} />
          )
        }} />
      </Switch>
      {/* <Layout className="mainLayout">
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
      </Layout> */}
    </Router>

  );
}
const MainApp = (props) => {
  return (

    <Layout className="mainLayout">
      <Header>
        <AppHeader setSsoToken={props.setSsoToken} />
      </Header>

      <Content>
        <AppHome />
      </Content>

      <Footer>
        <AppFooter />
      </Footer>
    </Layout>
  )
}
const SubMenu = (props) => {
  return (
    <Layout className="mainLayout">
      <Header>
        <AppHeader setSsoToken={props.setSsoToken} />
      </Header>

      <Content>
        <Sub />
      </Content>

      <Footer>
        <AppFooter />
      </Footer>
    </Layout>
  )

}
export default App;
