import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Breadcrumb, Button, Drawer, Form, Space, Table, theme } from "antd"
import { Link, Navigate } from "react-router-dom"
import { createUser, getUsers } from "../../http/api"
import { CreateUserData, User } from "../../types"
import { useAuthStore } from "../../store"
import UserFilter from "./UserFilter"
import { useState } from "react"
import { PlusOutlined } from "@ant-design/icons"
import UserForm from "./forms/UserForm"

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
    }
]

const Users = () => {
    const queryClient = useQueryClient()
    const [form] = Form.useForm()
    const { token: { colorBgLayout } } = theme.useToken()
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { user } = useAuthStore()
    const { data: users, isLoading, isError, error } = useQuery({
        queryKey: ['users'],
        queryFn: () => {
            return getUsers().then((res) => res.data)
        },
        enabled: user?.role === 'admin'
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

    if (user?.role !== 'admin') {
        return <Navigate to='/' replace={true} />
    }

    return (
        <>
            <Breadcrumb className="my-4" items={[
                { title: <Link to='/'>Dashboard</Link> }, { title: 'Users' }
            ]} />
            {isLoading && <div>Loading...</div>}
            {isError && <div>{error.message}</div>}

            <UserFilter onFilterChange={(filterName: string, filterValue: string) => { console.log(filterName, filterValue) }}>
                <Button icon={<PlusOutlined />} type="primary" onClick={() => setDrawerOpen(true)}>Add User</Button>
            </UserFilter>
            <Table columns={columns} dataSource={users} rowKey={'id'} />

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