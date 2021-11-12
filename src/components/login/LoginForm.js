import { Form, Input, Button, Checkbox, Layout, Image, Carousel, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../css/Login.css'
import { useEffect } from 'react';
import SiderImg from '../../assets/images/anh_nen_dong_nai.jpg';
import SiderImg1 from '../../assets/images/bg-color.jpg';
import SiderImg2 from '../../assets/images/clean-design.jpg';
import { Footer } from 'antd/lib/layout/layout';
import CityLogo from '../../assets/images/dong_nai_logo.png';
import QR from '../../assets/images/qr.png';
import AppStoreLogo from '../../assets/images/apple.png';
import GGLogo from '../../assets/images/ggplay.png';

const { Sider, Content, Header } = Layout;

const NormalLoginForm = (props) => {
    const { setSsoToken } = props
    const clientId = "1dcleodlcaoodkc123";
    const ssoURL = "http://sso.ai2c.asia/org/authentication?clientid="
    const tokenInfoUrl = "https://sso.ai2c.asia/org/authentication/Authenticate?token=";
    // const baseUrl = "http://localhost:3000"
    const baseUrl = process.env.REACT_APP_BASE_URL
    const handleSSOLogin = () => {
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
            console.log(process.env.REACT_APP_BASE_URL)
            // setTimeout(() => {
            window.location.assign(`${ssoURL}${clientId}&returnUrl=${baseUrl}`)
            // }, 2222)
        } else {
            localStorage.setItem("token", token)
            setSsoToken(token)
            window.location.assign(baseUrl)
        }
    }
    const testUser = [
        {
            username: 'phuonglecva',
            password: '1111'
        },
        {
            username: 'haland2k2',
            password: '1111'
        },
        {
            username: 'messi30',
            password: '1111'
        },
        {
            username: 'ronaldo7',
            password: '1111'
        },
    ]
    useEffect(() => {

    }, [])
    const onFinish = (values) => {
        const { username, password } = values
        for (let user of testUser) {
            if ((user.username === username) && (user.password === password)) {
                props.setToken(true)
                localStorage.setItem("token", true)
                return
            }
        }
        alert(`User not found.`)
    };
    return (
        <Layout style={{ fontFamily: "'Open Sans', sans-serif" }}>
            <Sider className="img-sider" width={"40%"}>
                <Carousel autoplay>
                    <div>
                        <div style={{
                            position: "absolute", color: "red",
                            zIndex: "1000",
                            fontWeight: "bold",
                            // marginTop: "35%",
                            fontSize: "2.0em",
                            textTransform: "uppercase",
                            paddingLeft: "10px"

                        }}>
                            <Image src={CityLogo} width={"150px"} preview={false}></Image>
                            <h2 style={{ color: "red" }}>Ủy ban nhân dân tỉnh đồng nai</h2>
                        </div>
                        <Image src={SiderImg} width={"100%"} height={"100vh"} preview={false}></Image>
                    </div>
                </Carousel>
            </Sider>
            <Layout>
                <Header className="img-header" style={{ textAlign: "center" }}>
                    <div >
                        <div style={{
                            position: "absolute", color: "red",
                            zIndex: "1000",
                            fontWeight: "2000",
                            fontSize: "1.5em",
                            textTransform: "uppercase",
                            paddingLeft: "10px",
                        }}>
                            <Image src={CityLogo} width={"100px"} preview={false}></Image>
                            <b><h2 style={{ color: "red" }}>ubnd tỉnh đồng nai</h2>
                            </b>
                        </div>
                        <Image src={SiderImg} width={"100%"} height={"40vh"} preview={false}></Image>
                    </div>
                    {/* <Image src={SiderImg} height={"100%"} preview={false} width={"100%"}></Image> */}
                </Header>
                <Content style={{ height: "100vh" }}>
                    <div className="wrapper-login-form">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 18,
                            }}
                            style={{ minWidth: "350px" }}
                        >
                            <Form.Item name="title" wrapperCol={{ span: 24 }} style={{
                                textTransform: "uppercase",
                                textAlign: "center",
                            }}>
                                <h1 style={{ fontWeight: "bold" }}>Đăng nhập phần mềm dự báo kinh tế xã hội</h1>
                            </Form.Item>
                            <Form.Item label="Tài khoản" style={{ margin: "0px" }}>
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="" />
                            </Form.Item>
                            <Form.Item label="Mật khẩu" style={{ margin: "0px" }} >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder=""
                                />

                            </Form.Item>
                            <Form.Item label="" className="btn-login-wrapper" wrapperCol={{ span: 24 }} style={{ marginBottom: "0px" }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                >
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 24 }} className="btn-login-wrapper" style={{ marginBottom: "0px" }}>
                                <Button onClick={handleSSOLogin} className="login-form-button">
                                    Đăng nhập SSO
                                </Button>
                            </Form.Item>
                        </Form>
                        <div style={{ marginTop: "20%", textAlign: "center" }}>
                            <h4>Ủy ban nhân dân Tỉnh Đồng Nai</h4>
                            <div>Số 2 Nguyễn Văn Trị, Thanh Bình, Thành phố Biên Hòa, Đồng Nai.</div>
                            <hr style={{ width: "60%" }} />
                            <div>
                                <div className="img" style={{ width: "50%", float: "left", textAlign: "right" }}>
                                    <Image src={QR} width="80px" preview={false} />
                                </div>
                                <div style={{ width: "40%", marginLeft: "1%", float: "left", textAlign: "left" }} className="text">
                                    <div>Tải và cài đặt ứng dụng</div>
                                    <h1 style={{ color: "blue", fontWeight: "1000", marginBottom: "0" }}>Đô thị thông minh</h1>
                                    <a href="https://apps.apple.com/us/app/9999-t%E1%BA%BFt/id1448686663">
                                        <Image src={AppStoreLogo} preview={false} width={"20%"} style={{ marginRight: "2px" }} />
                                    </a>
                                    <a style={{marginLeft:"5px"}} href="https://play.google.com/store/apps/details?id=com.aic.tet9999&hl=vi&gl=US">
                                        <Image src={GGLogo} preview={false} width={"20%"} style={{ marginRight: "2px" }} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
                {/* <Footer>aic</Footer> */}
            </Layout>
        </Layout>
    );
};

export default NormalLoginForm;