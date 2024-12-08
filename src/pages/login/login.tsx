import { Layout, Card, Space, Form, Input, Checkbox, Button, Flex } from "antd"
import { LockFilled, LockOutlined, UserOutlined } from '@ant-design/icons'
import Logo from "../../components/icons/Logo"

const LoginPage = () => {
    return (
        <>
            <Layout style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
                <Space direction="vertical" align="center" size='large'>
                    <Layout.Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Logo />
                    </Layout.Content>
                    <Card
                        bordered={false}
                        style={{ width: 300 }}
                        title={
                            <Space style={{ width: '100%', fontSize: 16, justifyContent: 'center' }}>
                                <LockFilled />
                                Sign In
                            </Space>
                        }>
                        <Form initialValues={{ remember: true }}>
                            <Form.Item name='username' rules={[
                                { type: 'email', message: "Email is not valid" },
                                { required: true, message: "Username should be an email" }
                            ]}>
                                <Input prefix={<UserOutlined />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item name='password' rules={[{
                                required: true,
                                message: "Password is required",
                            }, {
                                min: 8,
                                message: "Password should be atleast 8 characters"
                            }]}>
                                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                            </Form.Item>
                            <Flex justify="space-between">
                                <Form.Item name='remember' valuePropName="checked">
                                    <Checkbox>Remember Me</Checkbox>
                                </Form.Item>
                                <a className="pt-[6px] text-[12px] text-red-500" href="">Forgot password</a>
                            </Flex>
                            <Form.Item name='username'>
                                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Space>
            </Layout>
        </>
    )
}

export default LoginPage