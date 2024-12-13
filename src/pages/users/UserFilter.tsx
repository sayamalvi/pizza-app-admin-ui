import { Card, Col, Form, Input, Row, Select } from "antd"

type UsersFilterProps = {
    children?: React.ReactNode
}
const UserFilter = ({ children }: UsersFilterProps) => {
    return (
        <Card className="my-4">
            <Row justify="space-between">
                <Col>
                    <Row className="gap-3">
                        <Col>
                            <Form.Item name="searchTerm">
                                <Input.Search allowClear={true} placeholder="Search" />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name="role">
                                <Select placeholder="Select Role" allowClear={true}>
                                    <Select.Option value="admin">Admin</Select.Option>
                                    <Select.Option value="manager">Manager</Select.Option>
                                    <Select.Option value="customer">Customer</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        {/* <Col>
                            <Select placeholder="Status" allowClear={true} onChange={(selectedItem) => onFilterChange('statusFilter', selectedItem)}>
                                <Select.Option value="ban">Ban</Select.Option>
                                <Select.Option value="active">Active</Select.Option>
                            </Select>
                        </Col> */}
                    </Row>
                </Col>
                <Col>
                    {children}
                </Col>
            </Row>
        </Card>
    )
}

export default UserFilter