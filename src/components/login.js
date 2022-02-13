import {Modal,Button} from 'react-bootstrap';
import logo from '../images/logo.jpg';
import React,{useState} from 'react';
function Login(props){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const login = () =>{
    alert(`you tried to register with email: ` + email+', password: ' + password); 
  }
  const updateInputs =(e) =>{
    let value = e.target.value;
    let name = e.target.name;
    switch (name){
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
  }
    return(
      <Modal {...props} size="md" centered  className='register-login-container'>
      <Modal.Header>
        <Modal.Title className='register-login-header'>
          <img src={logo}/>
          <h1>Account Login</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='register-login-body'>
        <input placeholder='Email' type={'email'} value={email} name = {'email'} onChange={updateInputs}/>
        <input placeholder='Password' type={'password'} value={password} name = {'password'} onChange={updateInputs}/>
      </Modal.Body>
      <Modal.Footer className='register-login-footer'>
        <Button variant="success" onClick={login}>Login</Button>
        <Button variant="danger" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
}
export default Login;