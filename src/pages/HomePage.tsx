import { Card, Col, Row, Typography, Statistic, Space, List, Tag, Skeleton, Button } from "antd"
import { useAuthStore } from "../store"
import { ComponentType } from "react"
import Icon, { BarChartOutlined } from '@ant-design/icons'
import Item, { Meta } from "antd/es/list/Item"
import { Link } from "react-router-dom"

const { Title, Text } = Typography

const list = [
  {
    OrderSummary: 'Personal Pepperoni',
    address: 'Bandra, Mumbai',
    amount: 1200,
    status: 'preparing',
    loading: false,
  },
  {
    OrderSummary: 'Personal Pepperoni',
    address: 'Bandra, Mumbai',
    amount: 1200,
    status: 'preparing',
    loading: false,
  },
  {
    OrderSummary: 'Personal Pepperoni',
    address: 'Bandra, Mumbai',
    amount: 1200,
    status: 'preparing',
    loading: false,
  },
  {
    OrderSummary: 'Personal Pepperoni',
    address: 'Bandra, Mumbai',
    amount: 1200,
    status: 'preparing',
    loading: false,
  },
  {
    OrderSummary: 'Personal Pepperoni',
    address: 'Bandra, Mumbai',
    amount: 1200,
    status: 'preparing',
    loading: false,
  },
  {
    OrderSummary: 'Personal Pepperoni',
    address: 'Bandra, Mumbai',
    amount: 1200,
    status: 'preparing',
    loading: false,
  },
]

interface CardTitleProps {
  title: string
  PrefixIcon: ComponentType<unknown>
}

const CardTitle = ({ title, PrefixIcon }: CardTitleProps) => {
  return (
    <Space>
      <Icon component={PrefixIcon} />
      {title}
    </Space>
  )
}

function HomePage() {
  const { user } = useAuthStore()
  return (
    <div>
      <Title level={4}>Welcome, {user?.firstName} 😁</Title>
      <Row className="mt-4" gutter={16}>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic title="Total Orders" value={52} />
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic title="Total Sales" value={70000} precision={2} prefix="Rs." />
              </Card>
            </Col>
            <Col span={24}>
              <Card title={<CardTitle title="Sales" PrefixIcon={BarChartOutlined} />} bordered={false}>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Card bordered={false} title={<CardTitle title="Sales" PrefixIcon={BarChartOutlined} />}>
            <List className="demo-loadmore-list" loading={false} itemLayout="horizontal" loadMore={true} dataSource={list}
              renderItem={(item) => (
                <Item>
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <Meta title={<a href="/" />} description={item.address} />
                    <Row className="gap-4" justify='space-between'>
                      <Col>
                        <Text strong>Rs.{item.amount}</Text>
                      </Col>
                      <Col>
                        <Tag color="volcano" >Rs.{item.status}</Tag>
                      </Col>
                    </Row>
                  </Skeleton>
                </Item>
              )}
            >
            </List>
            <div>
              <Button className="mt-20" type="link">
                <Link to='/orders'>See all orders</Link>
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default HomePage
