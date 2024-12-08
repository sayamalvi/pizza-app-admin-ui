import { Layout, Card, Space, Form, Input, Checkbox, Button, Flex, Alert } from "antd"
import { LockFilled, LockOutlined, UserOutlined } from '@ant-design/icons'
import Logo from "../../components/icons/Logo"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Credentials } from "../../types"
import { login, self } from "../../http/api"

const loginUser = async (credentials: Credentials) => {
    const { data } = await login(credentials)
    return data
}
const getSelf = async () => {
    const { data } = await self()
    return data;
}
const LoginPage = () => {

    const { data: selfData, refetch } = useQuery({
        queryKey: ['self'],
        queryFn: getSelf,
        enabled: false
    })

    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ['login'],
        mutationFn: loginUser,
        onSuccess: async () => {
            refetch()
            console.log(selfData)
        }
    })

    return (
        <Layout className="h-[100vh] grid items-center" >
            <Space direction="vertical" align="center" size='large'>
                <Layout.Content className="flex items-center justify-center">
                    <Logo />
                </Layout.Content>
                <Card
                    bordered={false}
                    className="w-[300px]"
                    title={
                        <Space className="w-[100%] text-[16px] justify-center" >
                            <LockFilled />
                            Sign In
                        </Space>
                    }>
                    <Form onFinish={(values) => {
                        mutate({ email: values.username, password: values.password })
                    }}
                        initialValues={{ remember: true }}>
                        {
                            isError && (
                                <Alert type="error" className="mb-4" message={error.message} />
                            )
                        }
                        <Form.Item name='username' rules={[
                            { type: 'email', message: "Email is not valid" },
                            { required: true, message: "Username should be an email" }
                        ]}>
                            <Input prefix={<UserOutlined />} placeholder="Username" />
                        </Form.Item>

                        <Form.Item name='password' rules={[{
                            required: true,
                            message: "Password is required",
                        }]}>
                            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                        </Form.Item>

                        <Flex justify="space-between">
                            <Form.Item name='remember' valuePropName="checked">
                                <Checkbox>Remember Me</Checkbox>
                            </Form.Item>
                            <a className="pt-[6px] text-[12px] text-red-500" href="#">Forgot password</a>
                        </Flex>
                        <Form.Item name='login'>
                            <Button className="w-[100%]" type="primary" htmlType="submit" loading={isPending}>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Space>
        </Layout>
    )
}

export default LoginPage