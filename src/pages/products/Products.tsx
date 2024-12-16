import { Breadcrumb, Button, Flex, Form, Space } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import ProductFilter from "./ProductFilter"

const Products = () => {
    const [filterForm] = Form.useForm()
    return (
        <>
            <Space className="w-[100%]" direction="vertical" size="large" >
                <Flex className="my-4" justify="space-between">
                    <Breadcrumb items={[
                        { title: <Link to='/'>Dashboard</Link> }, { title: 'Products' }
                    ]} />

                </Flex>
                <Form form={filterForm}>
                    <ProductFilter>
                        <Button icon={<PlusOutlined />} type="primary" onClick={() => { }}>Add Product</Button>
                    </ProductFilter>
                </Form>
            </Space>
        </>
    )
}

export default Products