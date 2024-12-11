import { Button, Card, Col, Input, Row, Select } from "antd"
import { PlusOutlined } from "@ant-design/icons"

type UsersFilterProps = {
    onFilterChange: (filterName: string, filterValue: string) => void
}
const UserFilter = ({ onFilterChange }: UsersFilterProps) => {
    return (
        <Card className="my-4">
            <Row justify="space-between">
                <Col>
                    <Row className="gap-3">
                        <Col>
                            <Input.Search allowClear={true} placeholder="Search" onChange={(e) => onFilterChange('searchFilter', e.target.value)} />
                        </Col>
                        <Col>
                            <Select placeholder="Select Role" allowClear={true} onChange={(selectedItem) => onFilterChange('roleFilter', selectedItem)}>
                                <Select.Option value="admin">Admin</Select.Option>
                                <Select.Option value="manager">Manager</Select.Option>
                                <Select.Option value="customer">Customer</Select.Option>
                            </Select>
                        </Col>
                        <Col>
                            <Select placeholder="Status" allowClear={true} onChange={(selectedItem) => onFilterChange('statusFilter', selectedItem)}>
                                <Select.Option value="ban">Ban</Select.Option>
                                <Select.Option value="active">Active</Select.Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Button icon={<PlusOutlined />} type="primary">Add User</Button>
                </Col>
            </Row>
        </Card>
    )
}

export default UserFilter