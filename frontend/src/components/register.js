import {Modal,Button, Form} from 'react-bootstrap';
import logo from '../images/logo.jpg';
import React,{useState} from 'react';
import axios from 'axios';

function Register(props){
  const [fullName,setFullName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const register = () =>{
    const cb = document.getElementById('terms-checkbox');
    const newUser = {
      email:email,
      fullName:fullName,
      password:password
    }
    if(cb.checked){
      axios.post(`http://localhost:8080/user/addNew`, { newUser })
      .then(res => {
        alert('user created!');
        setTimeout(()=>{
          window.location.href='http://localhost:3000/'
        },1500)
      }).catch(err=>{
        alert('email exists already');
        setEmail('');
      })
    }else{
      alert('please accept the terms and conditions');
    }  
  }
  const updateInputs =(e) =>{
    let value = e.target.value;
    let name = e.target.name;
    switch (name){
      case 'fullName':
        setFullName(value);
        break;
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
          <h1>Account Register</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='register-login-body'>
        <input placeholder='Full Name' value={fullName}  name = {'fullName'} onChange={updateInputs}/>
        <input placeholder='Email' type={'email'} value={email} name = {'email'} onChange={updateInputs} />
        <input placeholder='Password' type={'password'} value={password} name = {'password'} onChange={updateInputs}/>
      </Modal.Body>
      <Form id='terms-of-use'>
          <Form.Check type='checkbox' label={'I have read and agreed to the '} id='terms-checkbox'/>
          <a href='https://www.termsandconditionsgenerator.com/live.php?token=a7FRRaUsMmx5TrBX83Hpo4AiHiwKfRna' target='_blank'>terms and conditions</a>
        </Form>
      <Modal.Footer className='register-login-footer'>
        <Button variant="success" onClick={register}>Register</Button>
        <Button variant="danger" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
}
export default Register;