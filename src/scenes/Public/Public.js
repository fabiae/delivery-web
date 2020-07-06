import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'

import Main from './Main/Main'
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'
import RecoverPassword from './RecoverPassword/RecoverPassword'
import Head from '../../components/Head/Head'

const { Footer, Content } = Layout

const Public = props => {

    return (
        <Layout>
            <Head />
            <Content style={{ minHeight: '70vh', background: '#cecece' }}>
                <Switch>
                    <Route path="/signup" component={SignUp} />
                    <Route path="/signin" component={SignIn}/>
                    <Route path="/recover-pass" component={RecoverPassword} />
                    <Route path="/" component={Main} />
                </Switch>
            </Content>
            <Footer style={{ fontSize: '12px', textAlign: 'left' }}>Footer delivery</Footer>
        </Layout>
    )
}

Public.propTypes = {
    
}

export default Public