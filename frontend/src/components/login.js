import {Modal,Button} from 'react-bootstrap';
import logo from '../images/logo.jpg';
import React,{useState} from 'react';
import axios from 'axios';

function Login(props){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const login = (e) =>{
    const user = {
      email:email,
      password:password
    }
    if((e.key === 'Enter' || e.key === undefined )&& password !== '' && email !== ''){
      axios.post(`http://localhost:8080/user/login`, { user })
      .then(res => {
        alert('user logged In!');
        setTimeout(()=>{
          console.log(res.data)
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userEmail", email);
          window.location.href='http://localhost:3000/';
        },1500)
      }).catch(err=>{
        alert('email or password are wrong');
      })
    }
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
      <Modal.Body>
        <form className='register-login-body'>
          <input placeholder='Email' type={'email'} value={email} name = {'email'} onChange={updateInputs} onKeyUp={login}/>
          <input placeholder='Password' type={'password'} value={password} name = {'password'} onChange={updateInputs} onKeyUp={login}/>
        </form>
      </Modal.Body>
      <Modal.Footer className='register-login-footer'>
        <Button variant="success" onClick={login} disabled={email === '' || password ===''}>Login</Button>
        <Button variant="danger" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
}
export default Login;