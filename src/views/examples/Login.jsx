import React from "react";

// reactstrap components
import {Button,Card,CardBody,FormGroup,Form,Input,InputGroupAddon,InputGroupText,InputGroup,Row,Col} from "reactstrap";
import { Link, Redirect } from 'react-router-dom';
import { Consumer } from "../../context";
import { login } from '../../service/auth'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      redirect: false
    }
    this.remember = false
    this.error = ''
  }

  handleSubmit = e => {
    e.preventDefault()
    //this.props.history.push('/admin/index')
    if (this.state.email !== '' && this.state.password !== '') {
      this.setState({redirect: true})
      const token = new Date().getTime()
      sessionStorage.setItem('userData', token)
      /*login(this.state)
        .then((res) => {
          if (res.userData) {
            sessionStorage.setItem('userData', res)
            this.redirect = true
          } else {
            this.error = 'Login error, please verify your email or password'
          }
        })*/
    }
    
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    if (this.state.redirect || sessionStorage.getItem('userData')) {
      this.props.history.push('/admin/index')
    }
    return (
      <Consumer>
        {value => {
          return (<Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Login</small>
                </div>
                <Form role="form" onSubmit={e => this.handleSubmit(e)}>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Email" type="email" name="email" onChange={(e) => this.handleChange(e)} required/>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Password" type="password" name="password" onChange={(e) => this.handleChange(e)} required/>
                    </InputGroup>
                  </FormGroup>
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                      onChange={(e) => {this.remember = e.target.value}}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor=" customCheckLogin"
                    >
                      <span className="text-muted">Remember me</span>
                    </label>
                    {this.error !== '' ? <div className="alert alert-danger mt-5">{this.error}</div> : ''}
                  </div>
                  <div className="text-center">
                    <Button type="submit" className="my-4" color="primary" >
                      Sign in
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
            <Row className="mt-3">
              <Col xs="6">
                <a
                  className="text-light"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <small>Forgot password?</small>
                </a>
              </Col>
              <Col className="text-right" xs="6">
                <Link to="/auth/register">
                  <small className="text-white">Create new account</small>
                </Link>
              </Col>
            </Row>
          </Col>)
        }}
      </Consumer>
    );
  }
}

export default Login;
