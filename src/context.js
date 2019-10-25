import React from 'react'
import { register } from './service/auth';

const Context = React.createContext()

class Provider extends React.Component {
    state = {
        load: false,
        redirect: false
    }

    setReload = etat => {
        this.setState({load: etat})
    }

    handleSubmit = (e, value) => {
        e.preventDefault()
        if (value.name !== '' && value.email !== '' && value.role !== '' && this.state.password !== '') {
          register({name: value.name, email: value.email, password: value.password}).then(res => {this.setState({user: res})})
          this.setState({redirect: true})
        }
    }

    render() {
        return (
            <Context.Provider value={{
                ...this.state,
                reload: this.setReload,
                register: this.handleSubmit
            }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

const Consumer = Context.Consumer

export {Provider, Consumer}