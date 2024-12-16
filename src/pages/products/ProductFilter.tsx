import { Card, Col, Form, Input, Row, Select, Space, Switch, Typography } from "antd"

type ProductFilterProps = {
    children?: React.ReactNode
}
const ProductFilter = ({ children }: ProductFilterProps) => {
    return (
        <>
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
                                <Form.Item name="category">
                                    <Select placeholder="Select category" allowClear={true}>
                                        <Select.Option value="pizza">Pizza</Select.Option>
                                        <Select.Option value="beverages">Beverages</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item name="restaurant">
                                    <Select placeholder="Select restaurant" allowClear={true}>
                                        <Select.Option value="Restaurant 1">Restaurant 1</Select.Option>
                                        <Select.Option value="Restaurant 2">Restaurant 2</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Space>
                                    <Switch title="Show only published" defaultChecked onChange={() => { }} />
                                    <Typography.Text>Show only published</Typography.Text>
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        {children}
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default ProductFilter