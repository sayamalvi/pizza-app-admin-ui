import { Breadcrumb, Button, Flex, Form, Image, Space, Table, Tag, Typography } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import ProductFilter from "./ProductFilter"
import { GetProductResponse, Product } from "../../types"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { PER_PAGE } from "../../constants"
import { getProducts } from "../../http/api"
import { AxiosResponse } from "axios"
import { render } from "@testing-library/react"
import { format } from "date-fns"

const columns = [
    {
        title: 'Product Name',
        dataIndex: 'name',
        key: 'name',
        render: (text: string, record: Product) => {
            return <Space>
                <Image width={60} src={record.image} alt={record.name} />
                <Typography.Text>{text}</Typography.Text>
            </Space>
        },
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Status',
        dataIndex: 'isPublished',
        key: 'isPublished',
        render: (text: string, record: Product) => {
            return <Space>
                <Typography.Text>{record.isPublished ? <Tag color="green">Published</Tag> : <Tag color="red">Draft</Tag>}</Typography.Text>
            </Space>
        }
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text: string) => {
            return <Typography.Text>{format(new Date(text), 'dd/MM/yyyy HH:mm')}</Typography.Text>
        }
    },
]

const Products = () => {
    const [filterForm] = Form.useForm()
    const [queryParams, setQueryParams] = useState({
        perPage: PER_PAGE,
        currentPage: 1
    })
    const { data: products } = useQuery<AxiosResponse<GetProductResponse>>({
        queryKey: ['products', queryParams],
        queryFn: () => {
            const filteredParams = Object.fromEntries(
                Object.entries(queryParams).filter((item) => !!item[1])
            )
            const queryString = new URLSearchParams(
                filteredParams as unknown as Record<string, string>
            ).toString()
            return getProducts(queryString)
        },
        placeholderData: keepPreviousData
    })
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
                <Table
                    columns={[
                        ...columns,
                        {
                            title: 'Actions',
                            render: (_text: string, record: Product) => {
                                return (
                                    <Space>
                                        <Button type="link" onClick={() => {

                                        }}>
                                            Edit
                                        </Button>
                                        <Button type="link" onClick={() => {

                                        }}>Delete</Button>
                                    </Space>
                                )
                            }
                        }
                    ]}
                    dataSource={products?.data.products}
                    rowKey={'id'}
                    pagination={{
                        total: products?.data.meta.pagination.totalProducts,
                        current: queryParams.currentPage,
                        pageSize: queryParams.perPage,
                        showTotal: (total: number, range: number[]) => { return `Showing ${range[0]}-${range[1]} of ${total} items` }
                    }}
                />
            </Space>
        </>
    )
}

export default Products