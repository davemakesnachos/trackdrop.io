import React, { Component } from 'react';
import {
    Button,
    Grid,
    Header,
    Segment,
    Form,
} from 'semantic-ui-react'

export class Login extends Component {
    render() {
        return (
            <div className="login-form">
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth:'450px'}} >
                        <Form size = "large">
                            <Segment stacked>
                                <Form.Input fluid icon="user" iconPosition="left" placeholder="Email Address" />
                                <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type='password' />
                                <Button size="large">Login</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
               </Grid>
            </div>
        )
    }
  }
