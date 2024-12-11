import { useQuery } from "@tanstack/react-query"
import { Card, Col, Form, Input, Row, Select, Space } from "antd"
import { getTenants } from "../../../http/api"
import { Tenant } from "../../../types"

const UserForm = () => {
    const { data: tenants } = useQuery({
        queryKey: ['tenants'],
        queryFn: () => {
            return getTenants().then((res) => res.data)
        }
    })
    return (
        <Row>
            <Col span={24}>
                <Space direction="vertical">
                    <Card title="Basic Info" bordered={false}>
                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'First Name is required'
                                    }
                                ]}
                                    label="First Name" name="firstName">
                                    <Input size="large" placeholder="First Name" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Last Name is required'
                                    }
                                ]} label="Last Name" name="lastName">
                                    <Input size="large" placeholder="Last Name" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Item rules={[
                                    { type: 'email', message: 'Email is not valid' },
                                    {
                                        required: true,
                                        message: 'Email is required'
                                    }
                                ]} label="Email" name="email">
                                    <Input size="large" placeholder="Email" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    <Card title="Security Info" bordered={false}>
                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Password is required'
                                    }
                                ]} label="Password" name="password">
                                    <Input.Password type="password" size="large" placeholder="Password" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    <Card title="Roles" bordered={false}>
                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Role is required'
                                    }
                                ]} label="Role" name="role">
                                    <Select size="large" placeholder="Select Role" allowClear={true} >
                                        <Select.Option value="admin">Admin</Select.Option>
                                        <Select.Option value="manager">Manager</Select.Option>
                                        <Select.Option value="customer">Customer</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={[
                                    {
                                        required: true,
                                        message: 'Restaurant is required'
                                    }
                                ]} label="Restaurant" name="tenantId">
                                    <Select size="large" placeholder="Select Restaurant" allowClear={true} >
                                        {tenants?.map((tenant: Tenant) => (
                                            <Select.Option key={tenant.id} value={tenant.id}>{tenant.name}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>

                        </Row>
                    </Card>

                </Space>
            </Col>
        </Row>
    )
}

export default UserForm