import React, { useEffect, useState } from 'react'
import { Layout, Row, Table, Typography, Tag, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import Head from '../../components/Head/Head'
import token from '../../@common/storage/token'
import adminActions from '../../services/admin/adminActions'
import { Roles, States } from '../../@common/constants/constants'

const { Content, Footer } = Layout
const { Column } = Table
const { Text } = Typography

const Private = props => {

    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { loading: { loadingListClients }, clients } = useSelector(state => state.admin)
    const { listClients } = adminActions
    const [isAdmin, setIsAdmin] = useState(false)
    const data = token.decode()

    useEffect(() => {
        if(data.roles.includes(Roles.ADMIN)){
            setIsAdmin(true)
            dispatch(listClients())
        }
    },[])

    return (
        <Layout>
            <Head />
            <Content style={{ minHeight: '70vh', background: '#cecece' }}>

                <Row style={{ margin: '20px' }}>
                    <Text style={{ marginLeft: 'auto', marginRight: 'auto', fontSize: '20px' }}>
                        {t('welcome')} { data.name } : { data.roles.map(role => role +" " ) }
                    </Text>
                </Row>

                {
                    isAdmin ? 
                    <div>
                        <Row style={{ margin: '20px' }}>
                            <Text style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                {t('listClients')}
                            </Text>
                        </Row>

                        <Row style={{ margin: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                            <Spin spinning={loadingListClients} >
                                <Table
                                    dataSource={clients}>
                                    <Column 
                                        title={t('id')}
                                        dataIndex="id"
                                        key="id" />
                                    <Column 
                                        title={t('name')}
                                        dataIndex="name"
                                        key="name" />
                                    <Column 
                                        title={t('email')}
                                        dataIndex="email"
                                        key="email" />
                                    <Column 
                                        title={t('state')}
                                        dataIndex="state"
                                        key="state"
                                        render={state => {
                                            let color = state === States.ACTIVE ? 'green' : 'red'
                                            return (
                                                <Tag color={color}>
                                                    {state}
                                                </Tag>
                                            )
                                        }} />
                                </Table>
                            </Spin>
                        </Row> 
                    </div> :  null
                }
                
                

            </Content>
            <Footer style={{ fontSize: '12px', textAlign: 'left' }}>Footer delivery</Footer>
        </Layout>
    )
}

Private.propTypes = {
    
}

export default Private