import { useQuery } from "@tanstack/react-query"
import { Breadcrumb, Table } from "antd"
import { Link, Navigate } from "react-router-dom"
import { getUsers } from "../../http/api"
import { User } from "../../types"
import { useAuthStore } from "../../store"
import UserFilter from "./UserFilter"

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
    const { user } = useAuthStore()
    const { data: users, isLoading, isError, error } = useQuery({
        queryKey: ['users'],
        queryFn: () => {
            return getUsers().then((res) => res.data)
        },
        enabled: user?.role === 'admin'
    })

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
            <UserFilter onFilterChange={(filterName: string, filterValue: string) => { console.log(filterName, filterValue) }} />
            <Table columns={columns} dataSource={users} rowKey={'id'} />
        </>
    )
}

export default Users