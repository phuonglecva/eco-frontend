import React from 'react';

import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';

const items = [
  {
    key: '1',
    icon: <i className="fas fa-chart-pie"></i>,
    title: 'Tập đoàn',
    content: 'Aic group là tập đoàn đã thực hiện rất nhiều những dự án liên quan đến chuyển đổi số và thành phố thông minh, đóng góp lớn vào trong tiến trình phát triển của đất nước',
  },
  {
    key: '2',
    icon: <i className="fas fa-desktop"></i>,
    title: 'Nhóm nghiên cứu',
    content: 'Nhóm chúng tôi gồm các thành viên có nhiều năm kinh nghiệm trong lĩnh vực công nghệ thông tin, dưới sự hướng dẫn của các chuyên gia hàng đầu đến từ các trường  đại học và viện nghiên cứu trên cả nước',
  },
  // {
  //   key: '3',
  //   icon: <i className="fas fa-database"></i>,
  //   title: 'Simplified Workflow',
  //   content: 'cu nostro dissentias consectetuer mel. Ut admodum conceptam mei, cu eam tation fabulas abhorreant. His ex mandamus.',
  // },
]

function AppAbout() {
  return (
    <div id="about" className="block aboutBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>About Us</h2>
          <p>Ban nghiên cứu và phát triển aic group</p>
        </div>
        <div className="contentHolder">
          <p>Tiên phong trong lĩnh vực chuyển đổi số và thành phố thông minh</p>
        </div>
        <Row gutter={[16, 16]}>   
          {items.map(item => {
            return (
              <Col md={{ span: 12 }} key={item.key}>
                <div className="content">
                  <div className="icon">
                    {item.icon}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default AppAbout;