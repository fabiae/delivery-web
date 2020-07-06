import React, { useEffect } from 'react';
import { Layout, Spin, Row, Col, Typography, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogoutOutlined } from '@ant-design/icons'

import utilitiesActions from '../../services/utilities/utilitiesActions';
import authActions from '../../services/auth/authActions'
import { getIcon } from '../../@common/functions/getIcon';
import { Config } from '../../@common/config/config';
import logo from '../../logo.svg'

const { Header } = Layout
const { Title, Text } = Typography

const Head = props => {

    const dispatch = useDispatch()
    const { t } = useTranslation() 
    const { authenticated } = useSelector(state => state.auth)
    const { languages, loading: { loadingLanguages } } = useSelector(state => state.utilities)
    const { getLanguages, setLanguage } = utilitiesActions
    const { logOut } = authActions
    const appName = Config.get("NAME_APP")

    const handleLanguage = (language) => {
        dispatch(setLanguage(language))
    }

    const handleLogOut = () => {
        dispatch(logOut())
    }

    useEffect(()=> {
        if(!languages)
            dispatch(getLanguages())
    },[])

    return (
        <Header>
            <Row>

                <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                        <img style={{ width: '60px' }} alt='logo' src={logo}/>
                        <Title style={{ color: '#fff', margin: '0px' }} level={4} >{ appName }</Title>
                    </Link>                
                </Col>

                <Col 
                    offset={authenticated ? 10 : 13 } 
                    span={7} 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>

                    <Text style={{ color: '#fff', marginRight: '10px', fontSize: '10px' }}>{t('languages')}</Text>
                    <Spin spinning={loadingLanguages}>
                        { languages && 
                            languages.map(language => 
                                <img 
                                    key={language.id} 
                                    alt="" 
                                    src={getIcon(language.key)} 
                                    height={22} 
                                    width={40} 
                                    onClick={() => handleLanguage(language.key)}
                                    style={{ cursor: 'pointer', margin: '2px 2px' }} />
                            )}
                    </Spin>
                </Col>
                { authenticated ? 
                    <Col span={3}>
                        <Button 
                            style={{ color: "#fff" }} 
                            type="link" 
                            icon={<LogoutOutlined />}
                            onClick={() => handleLogOut()}>Log out</Button>
                    </Col>
                    : null 
                }
            </Row>           
        </Header>
    );
};

Head.propTypes = {
    
};

export default Head;