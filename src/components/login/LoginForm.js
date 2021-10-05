import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../css/Login.css'
const NormalLoginForm = (props) => {
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
    const onFinish = (values) => {
        const {username, password} = values
        for(let user of testUser) {
            if ((user.username ===  username) && (user.password === password)) {
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
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Đăng nhập
                    </Button>
                    Hoặc <a href="">Đăng ký</a>
                </Form.Item>
            </Form>
        </div>
    );
};

export default NormalLoginForm;