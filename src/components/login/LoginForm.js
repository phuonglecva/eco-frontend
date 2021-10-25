import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../css/Login.css'
import { useEffect } from 'react';
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
        <div className="wrapper-login-form">

            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item name="title">
                    <h1>Đăng nhập</h1>
                </Form.Item>
                <Form.Item label="Tên đăng nhập" style={{ margin: "0px" }} />
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên đăng nhập" />
                </Form.Item>
                <Form.Item label="Mật khẩu" style={{ margin: "0px" }} />
                <Form.Item
                    name="password"
                // rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Mật khẩu"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        {/* <Checkbox>Remember me</Checkbox> */}
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Quên mật khẩu
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        style={{
                            marginBottom: "10px"
                        }}
                    >
                        Đăng nhập
                    </Button>
                    <Button onClick={handleSSOLogin} className="login-form-button">
                        Đăng nhập SSO
                    </Button>
                    Hoặc <a href="">Đăng ký</a>
                </Form.Item>
            </Form>
        </div>
    );
};

export default NormalLoginForm;