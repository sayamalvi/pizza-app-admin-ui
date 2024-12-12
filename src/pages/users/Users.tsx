import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Breadcrumb, Button, Drawer, Form, Space, Spin, Table, theme, Flex, Typography } from "antd"
import { Link, Navigate } from "react-router-dom"
import { createUser, getUsers } from "../../http/api"
import { CreateUserData, FieldData, User } from "../../types"
import { useAuthStore } from "../../store"
import UserFilter from "./UserFilter"
import { useMemo, useState } from "react"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import UserForm from "./forms/UserForm"
import { PER_PAGE } from "../../constants"
import { debounce } from "lodash"

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'firstName',
        key: 'firstName',
        render: (_text: string, record: User) => { return <a>{record.firstName} {record.lastName}</a> },
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role'
    },
    {
        title: 'Restaurant',
        dataIndex: 'tenant',
        key: 'tenant',
        render: (_text: string, record: User) => { return <div>{record.tenant?.name}</div> },

    }
]

const Users = () => {
    const queryClient = useQueryClient()

    const [form] = Form.useForm()
    const [filterForm] = Form.useForm()

    const { token: { colorBgLayout } } = theme.useToken()
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { user } = useAuthStore()

    const [queryParams, setQueryParams] = useState({
        perPage: PER_PAGE,
        currentPage: 1
    })

    const { data: users, isFetching, isError, error } = useQuery({
        queryKey: ['users', queryParams],
        queryFn: () => {
            const filteredParams = Object.fromEntries(Object.entries(queryParams).filter(item => !!item[1]))
            const queryString = new URLSearchParams(filteredParams as unknown as Record<string, string>).toString()
            return getUsers(queryString).then((res) => res.data)
        },
        enabled: user?.role === 'admin',
        placeholderData: keepPreviousData
    })

    const { mutate: createUserMutation } = useMutation({
        mutationKey: ['createUser'],
        mutationFn: async (data: CreateUserData) => {
            return createUser(data).then((res) => res.data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            setDrawerOpen(false)
            form.resetFields()
        }
    })

    const onHandleSubmit = async () => {
        await form.validateFields()
        createUserMutation(form.getFieldsValue())
    }

    const debouncedSeachUpdate = useMemo(() => {
        return debounce((value: string) => {
            setQueryParams((prev) => ({ ...prev, searchTerm: value }))
        }, 1000)
    }, [])

    const onFilterChange = (changedFields: FieldData[]) => {
        const changedFilterFields = changedFields.map((item) => ({ [item.name]: item.value })).reduce((acc, item) => ({ ...acc, ...item }), {})
        if (changedFilterFields.searchTerm) {
            debouncedSeachUpdate(changedFilterFields.searchTerm)
        }
        else {
            setQueryParams((prev) => ({ ...prev, ...changedFilterFields }))
        }
    }

    if (user?.role !== 'admin') {
        return <Navigate to='/' replace={true} />
    }

    return (
        <>
            <Flex className="my-4" justify="space-between">
                <Breadcrumb items={[
                    { title: <Link to='/'>Dashboard</Link> }, { title: 'Users' }
                ]} />
                {isFetching && <Spin indicator={<LoadingOutlined />} className="text-xl" spinning={true} />}
                {isError && <Typography.Text type="danger">{error.message}</Typography.Text>}

            </Flex>

            <Form form={filterForm} onFieldsChange={onFilterChange}>
                <UserFilter>
                    <Button icon={<PlusOutlined />} type="primary" onClick={() => setDrawerOpen(true)}>Add User</Button>
                </UserFilter>
            </Form>

            <Table
                columns={columns}
                dataSource={users?.data}
                rowKey={'id'}
                pagination={{
                    total: users?.total,
                    current: queryParams.currentPage,
                    pageSize: queryParams.perPage,
                    onChange: (page) => {
                        setQueryParams((prev) => {
                            return { ...prev, currentPage: page }
                        })
                    }
                }}
            />

            <Drawer
                className={`bg-[${colorBgLayout}]`}
                open={drawerOpen}
                title="Create User"
                width={400}
                destroyOnClose={true}
                onClose={() => { setDrawerOpen(false) }}
                extra={
                    <Space>
                        <Button onClick={() => {
                            setDrawerOpen(false);
                            form.resetFields()
                        }}>Cancel</Button>
                        <Button type="primary" onClick={onHandleSubmit}>Submit</Button>
                    </Space>
                }
            >
                <Form layout="vertical" form={form}>
                    <UserForm />
                </Form>
            </Drawer >

        </>
    )
}

export default Users