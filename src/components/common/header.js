import Logo from '../../assets/images/aic-logo.png';
import React, { useState } from 'react';

import { Anchor, Drawer, Button, Image } from 'antd';

const { Link } = Anchor;


function AppHeader(props) {
  const [visible, setVisible] = useState(false);


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
              props.setToken(false)
            }
          }}>
            <Link href="http://localhost:3000/#hero" title="Trang chủ" />
            <Link href="http://localhost:3000/#about" title="Về chúng tôi" />
            <Link href="http://localhost:3000/#feature" title="Tính năng" />
            <Link href="http://localhost:3000/#faq" title="Câu hỏi" />
            <Link href="http://localhost:3000/#contact" title="Liên hệ" />
            <div style={{ borderLeft: "1px solid gray" }}>
              <Link title="Đăng xuất" />
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
              <Link href="http://localhost:3000/#hero" title="Trang chủ" />
              <Link href="http://localhost:3000/#about" title="Về chúng tôi" />
              <Link href="http://localhost:3000/#feature" title="Tính năng" />
              <Link href="http://localhost:3000/#faq" title="Câu hỏi" />
              <Link href="http://localhost:3000/#contact" title="Liên hệ" />
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