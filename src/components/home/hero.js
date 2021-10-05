import React from 'react';
import { Button, Modal } from 'antd';

import { Carousel } from 'antd';
import Video from '../../assets/videos/intro.mp4'
import { Link } from 'react-router-dom';
const items = [
  {
    key: '1',
    title: 'Dự báo kiến tạo tương lai',
    content: 'Phần mềm dự báo - Ban R&D - AIC Group',
  },
]

class AppHero extends React.Component {
  constructor(props) {
    super(props)
  }
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  render() {
    const { setToken } = this.props;

    return (
      <div id="hero" className="heroBlock">
        <Carousel autoplay>
          {items.map(item => {
            return (
              <div key={item.key} className="container-fluid">
                <div className="content" style={{ color: "white" }}>
                  <h3 style={{ color: "white" }}>{item.title}</h3>
                  <p>{item.content}</p>
                  <div className="btnHolder">
                    <Button type="primary" size="large">
                      <Link to='/sub-menu'>Bắt đầu</Link>
                    </Button>
                    <Modal
                      title="Giới thiệu phần mêm dự báo"
                      visible={this.state.visible}
                      onCancel={this.handleCancel}
                      footer={null}
                      destroyOnClose={true}
                      width={900}
                      centered
                    >
                      <video style={{width:"100%"}} controls autostart autoPlay src={Video} type="video/mp4" />
                    </Modal>
                    <Button size="large" onClick={this.showModal}>
                      Video giới thiệu
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    );
  }
}

export default AppHero;