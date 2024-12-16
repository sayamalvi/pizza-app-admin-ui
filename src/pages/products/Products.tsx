import { Breadcrumb, Flex, Space } from "antd"
import { Link } from "react-router-dom"

const Products = () => {
    return (
        <>
            <Space className="w-[100%]" direction="vertical" size="large" >
                <Flex className="my-4" justify="space-between">
                    <Breadcrumb items={[
                        { title: <Link to='/'>Dashboard</Link> }, { title: 'Products' }
                    ]} />

                </Flex>
            </Space>
        </>
    )
}

export default Products