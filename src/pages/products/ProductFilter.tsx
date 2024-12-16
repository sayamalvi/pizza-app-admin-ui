import { useQuery } from "@tanstack/react-query"
import { Card, Col, Form, Input, Row, Select, Space, Switch, Typography } from "antd"
import { getCategories, getTenants } from "../../http/api"
import { Category, Tenant } from "../../types"

type ProductFilterProps = {
    children?: React.ReactNode
}
const ProductFilter = ({ children }: ProductFilterProps) => {

    const { data: restaurants } = useQuery({
        queryKey: ['restaurants'],
        queryFn: () => {
            return getTenants()
        },
    })
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => {
            return getCategories()
        },
    })
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
                                <Form.Item name="categoryId">
                                    <Select placeholder="Select category" allowClear={true}>
                                        {categories?.data.map((category: Category) => (
                                            <Select.Option key={category._id} value={category._id}>{category.name}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item name="tenantId">
                                    <Select placeholder="Select Restaurant" allowClear={true}>
                                        {restaurants?.data.map((restaurant: Tenant) => (
                                            <Select.Option key={restaurant.id} value={restaurant.id}>{restaurant.name}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Space>
                                    <Form.Item name="isPublished">
                                        <Switch title="Show only published" defaultChecked={false} />
                                    </Form.Item>
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