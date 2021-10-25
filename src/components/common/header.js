import Logo from '../../assets/images/aic-logo.png';
import portrait from '../../assets/images/portrait.jpg'
import React, { useEffect, useState } from 'react';

import {
  Anchor,
  Menu, Dropdown, Modal, Button,
  Card, Layout, Row, Col
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import axios from 'axios';
const { Meta } = Card;
const { Link } = Anchor;
const { Sider, Content, Header, Footer } = Layout;
const hostname = "https://sso.ai2c.asia/"
const ssoUrl = "http://sso.ai2c.asia/org/authentication/Logout?returnurl="
const tokenInfoUrl = "https://sso.ai2c.asia/org/authentication/Authenticate?token=";

const baseUrl = process.env.REACT_APP_BASE_URL
// const baseUrl = "http://localhost:3000"

function AppHeader(props) {
  const [user, setUser] = useState({
    "Họ và tên": "Lê Chung Phương",
    "Tuổi": 22,
    "Số điện thoại": "+84363201298",
    "Vị trí": "Nhân viên",
    "Phòng ban": "Nghiên cứu phát triển",
    'Tên đăng nhập': ''
  })
  const [visible, setVisible] = useState(false);
  const { setSsoToken } = props
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchUserInfo = () => {
    const token = localStorage.getItem("token")
    axios.get(`${tokenInfoUrl}${token}`).then((res) => {
      console.log(res.data)
      const {Fullname, Email, Username} = res.data
      // let userTemp = user
      // userTemp['Họ và tên'] = Fullname
      // userTemp['Tên đăng nhập'] = Username
      // userTemp['Email'] = Email
      // setUser(userTemp)
      setUser({...user, 'Họ và tên': Fullname, 'Tên đăng nhập': Username, 'Email': Email})
      console.log(user)
    })

  }
  useEffect(() => {
    fetchUserInfo()
  }, [])
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  // modal handle function 
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // user details
  const LogoutMenu = (
    <Menu style={{ marginTop: "20px" }}>
      <Menu.Item>
        <a onClick={showModal}>
          Thông tin người dùng
        </a>
      </Menu.Item>
      <Menu.Item danger onClick={() => {
        localStorage.clear()
        setSsoToken(false)
      }}>
        <a href={`${ssoUrl}${baseUrl}`} title="">Đăng xuất</a>
      </Menu.Item>
    </Menu>
  )
  return (
    <div className="container-fluid" style={{
      padding: "0px",
      margin: "0px",
      backgroundColor: ""
    }}>
      <div className="header">
        <div className="logo">
          <a href="/">
            <img id="img" src={Logo} />
          </a>
        </div>
        <div className="mobileHidden" style={{ maxHeight: "100%" }}>
          <div style={{display:"inline", marginRight:"15px", fontSize:"1.8vmin", borderLeft:"1px double gray", paddingLeft:"30px"}}>{user['Tên đăng nhập']}</div>
          <Dropdown overlay={LogoutMenu}>
            <a>
              <img id="portrait" src={portrait} style={{
                borderRadius: "50%",
                height: "100%",
                paddingTop: "10%",
                paddingBottom: "10%",
              }} />
              <DownOutlined style={{ marginLeft: "5px" }} />
            </a>
          </Dropdown>
        </div>
        <Modal title={(
          <h3 style={{ fontWeight: "600", fontFamily: "'Helvetica', 'Arial', sans-serif", margin: "0px" }}>
            Thông tin người dùng
          </h3>)}
          width="50%" visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
          style={{
            marginTop: "8%", minWidth: "450px", borderRadius: "20px",
            fontFamily: "'Helvetica', 'Arial', sans-serif",
          }}
        >
          <Row>
            <Col span={6} row>
              <img alt="example" src={portrait} style={{ width: "100%" }} />
            </Col>
            <Col className="detail" span={16}>
              {Object.entries(user).map((row) => {
                return (
                  <Row className={row[0]} style={{ marginBottom: "20px", fontSize: "2vmin" }}>
                    <Col span={8} offset={4}>
                      {row[0]}:
                    </Col>
                    <Col span={10} offset={2}>
                      {row[1]}
                    </Col>
                  </Row>
                )
              })}
            </Col>
          </Row>

        </Modal>
      </div>
    </div>
  );
}

export default AppHeader;