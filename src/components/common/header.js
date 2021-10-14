import Logo from '../../assets/images/aic-logo.png';
import React, { useState } from 'react';

import { Anchor, Drawer, Button, Image } from 'antd';

const { Link } = Anchor;
const hostname = "https://aic-group.bike/"
const ssoUrl = "http://sso.ai2c.asia/org/authentication/Logout?returnurl="
const baseUrl = "https://ktxh.ai2c.asia/"

function AppHeader(props) {
  const [visible, setVisible] = useState(false);
  const { setSsoToken } = props

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="container-fluid" >
      <div className="header">
        <div className="logo">
          <a href="/">
            <img id="img" src={Logo} />
          </a>
        </div>
        <div className="mobileHidden">
          <Anchor targetOffset="65" onClick={(event, obj) => {
            if (obj.title === 'Đăng xuất') {
              localStorage.clear()
              setSsoToken(false)
            }
          }}>
            <Link href={`${hostname}#hero`} title="Trang chủ" />
            <Link href={`${hostname}#about`} title="Về chúng tôi" />
            <Link href={`${hostname}#feature`} title="Tính năng" />
            <Link href={`${hostname}#faq`} title="Câu hỏi" />
            <Link href={`${hostname}#contact`} title="Liên hệ" />
            <div style={{ borderLeft: "1px solid gray" }}>
              <Link href={`${ssoUrl}${baseUrl}`} title="Đăng xuất" />
            </div>
          </Anchor>
        </div>
        <div className="mobileVisible">
          <Button type="primary" onClick={showDrawer}>
            <i className="fas fa-bars"></i>
          </Button>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Anchor targetOffset="65">
              <Link href={`${hostname}#hero`} title="Trang chủ" />
              <Link href={`${hostname}#about`} title="Về chúng tôi" />
              <Link href={`${hostname}#feature`} title="Tính năng" />
              <Link href={`${hostname}#faq`} title="Câu hỏi" />
              <Link href={`${hostname}#contact`} title="Liên hệ" />
              <div style={{ borderLeft: "1px solid gray" }}>
                <Link title="Đăng xuất" />
              </div>
            </Anchor>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default AppHeader;