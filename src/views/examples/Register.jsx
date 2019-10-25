import React from "react";
// reactstrap components
import {Button,Card,CardBody,FormGroup,Form,Input,InputGroupAddon,InputGroupText,InputGroup,Row,Col} from "reactstrap";
import { register } from '../../service/auth'
import { Consumer } from '../../context';

class Register extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      name: '',
      email: '',
      role: '',
      password: '',
      password_confirmed: '',
      redirect: false
    }
    this.password_strength = false
    this.agree = false
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    if (this.state.password !== '') {
      this.password_strength = true
    }
    if (this.state.redirect) {
      this.props.history.push('/auth/login')
    }
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <h3>Sing up</h3>
              </div>
              <Consumer>
                {value => {
                  if (value.redirect) {
                    this.props.history.push('/auth/login')
                  }
                  return (<Form role="form" onSubmit={(e) => value.register(e, {email: this.state.email, password: this.state.password, name: this.state.name})}>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Name" type="text" name="name" onChange={(e) => this.handleChange(e)}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" type="email" name="email" onChange={(e) => this.handleChange(e)} />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-circle-08" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" name="role" id="exampleSelect" onChange={(e) => this.handleChange(e)}>
                          <option>Étudiant</option>
                          <option>Professeur</option>
                          <option>Administrateur</option>
                        </Input>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Password" type="password" name="password" onChange={(e) => this.handleChange(e)}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Confirm password" type="password" name="password_confirmed" onChange={(e) => this.handleChange(e)} />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-muted font-italic">
                      { this.password_strength ? (
                        <small>
                          password strength:{" "}
                          { this.state.password.length >= 8 ? (
                            <span className="text-success font-weight-700">fort</span>
                          ) : (
                            <span className="text-danger font-weight-700">faible</span>
                          ) }
                        </small>
                      ) : ''}
                      
                    </div>
                    <Row className="my-4">
                      <Col xs="12">
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id="customCheckRegister"
                            type="checkbox"
                            onChange={(e) => this.agree = e.target.value}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheckRegister"
                          >
                            <span>
                              I agree with the{" "}
                              <a href="#pablo" onClick={e => e.preventDefault()}>
                                Privacy Policy
                              </a>
                            </span>
                          </label>
                        </div>
                      </Col>
                    </Row>
                    <div className="text-center">
                      <Button className="mt-4" color="primary" type="submit">
                        Create account
                      </Button>
                    </div>
                  </Form>
                )}}
              </Consumer>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Register;
