import React from 'react';

import image1 from '../../assets/images/images/rr.PNG';
import image2 from '../../assets/images/images/csph.PNG';
import image3 from '../../assets/images/images/dhcl.PNG';
import image4 from '../../assets/images/images/ktxh.PNG';
import image5 from '../../assets/images/images/qdkt.PNG';
import image6 from '../../assets/images/images/ptch.PNG';

import { Row, Col, Image } from 'antd';
import { Card } from 'antd';
const { Meta } = Card;

function AppFeature() {
  return (
    <div id="feature" className="block featureBlock bgGray" style={{paddingTop:"30px"}}>
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Key Features and Benefits</h2>
          <p>Các tính năng và lợi ích của phần mềm dự báo</p>
        </div>
        <Row style={{textAlign:"center"}} gutter={[16, 16]}>
          <Col  xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              hoverable
              cover={<Image preview={false} width={100} height={100} alt="Modern Design" src={image1} />}
            >
              <Meta title="Phân tích rủi ro và thách thức" />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              hoverable
              cover={<Image preview={false} width={100} height={100} alt="Test" src={image2} />}
            >
              <Meta title="Phân tích cơ hội tiềm năng" />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              hoverable
              cover={<Image preview={false} width={100} height={100} alt="Test" src={image3} />}
            >
              <Meta title="Đánh giá tình hình kinh tế xã hội" />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              hoverable
              cover={<Image preview={false} width={100} height={100} alt="Test" src={image4} />}
            >
              <Meta title="Định hướng chiến lược" />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              hoverable
              cover={<Image preview={false} width={100} height={100} alt="Test" src={image5} />}
            >
              <Meta title="Chính sách phù hợp" />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              hoverable
              cover={<Image preview={false} width={100} height={100} alt="Test" src={image6} />}
            >
              <Meta title="Quyết định chính xác" />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AppFeature;