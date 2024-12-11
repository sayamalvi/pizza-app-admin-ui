import { Navigate, NavLink, Outlet } from "react-router-dom"
import { useAuthStore } from "../store"
import { Avatar, Badge, Dropdown, Flex, Layout, Menu, Space } from "antd"
import { HomeOutlined, UserOutlined, ShopOutlined, BellFilled } from '@ant-design/icons'
import { useState } from "react"
import Logo from "../components/icons/Logo"
import { useLogout } from "../hooks/useLogout"

const { Sider, Content, Header, Footer } = Layout

const getMenuItems = (role: string) => {
    const baseItems = [
        {
            key: '/',
            icon: <HomeOutlined />,
            label: <NavLink to='/'>Home</NavLink>
        },
        {
            key: '/tenants',
            icon: <ShopOutlined />,
            label: <NavLink to='/tenants'>Tenants</NavLink>
        },
        {
            key: '/products',
            icon: <UserOutlined />,
            label: <NavLink to='/products'>Products</NavLink>
        },
        {
            key: '/promos',
            icon: <UserOutlined />,
            label: <NavLink to='/promos'>Promos</NavLink>
        },
    ]
    if (role === 'admin') {
        const menus = [
            ...baseItems,
        ]
        menus.splice(1, 0, {
            key: '/users',
            icon: <UserOutlined />,
            label: <NavLink to='/users'>Users</NavLink>
        },)
        return menus
    }
    return baseItems
}


const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false)
    const { user } = useAuthStore()
    const { logoutMutation } = useLogout()

    if (!user) {
        return <Navigate to='/auth/login' replace={true} />
    }

    const items = getMenuItems(user.role)

    return (
        <Layout className="min-h-[100vh]">
            <Sider
                theme="light"
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className="px-6 py-6">
                    <Logo />
                </div>
                <Menu items={items} theme="light" defaultSelectedKeys={['/']} mode="inline" />
            </Sider>
            <Layout>
                <Header className='px-6 bg-white'>
                    <Flex gap='middle' align="start" justify="space-between">
                        <Badge text={user.role === 'admin' ? 'Admin' : user.tenant?.name} status="success" />
                        <Space size={16}>
                            <Badge dot={true}>
                                <BellFilled />
                            </Badge>
                            <Dropdown menu={{ items: [{ key: 'logout', label: 'Logout', onClick: () => logoutMutation() }] }} placement="bottomRight">
                                <Avatar className="bg-[#f56a00]">S</Avatar>
                            </Dropdown>
                        </Space>
                    </Flex>
                </Header>
                <Content className="m-5">
                    <Outlet />
                </Content>
                <Footer className="text-center">Sayam's Pizza</Footer>
            </Layout>
        </Layout>

    )
}

export default Dashboard