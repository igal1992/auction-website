import {Modal,Button, Form} from 'react-bootstrap';
import logo from '../images/logo.jpg';
import React,{useState} from 'react';
import axios from 'axios';
import { ToastAlert } from './utils';

function Register(props){
  const [fullName,setFullName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [currentAlert,setCurrentAlert] = useState('');
  const [currentHeader,setCurrentHeader] = useState('');
  const [showAlert,setShowAlert] = useState(false);
  const emailRegex = "[a-z0-9._%+-]+@[a-z0-9.-]+[a-z]{2,4}";
  const fullNameRegex = "[a-zA-Z]{5,20}";
  const passRegex = "([a-zA-Z0-9.-@#$%]){4,12}";

  const register = (e) =>{
    const cb = document.getElementById('terms-checkbox');
    const newUser = {
      email:email,
      fullName:fullName,
      password:password
    }
    if((e.key === 'Enter' || e.key === undefined )&& password !== '' && email !== '' && fullName !== ''){
      if(cb.checked){
        if(email.match(emailRegex) && password.match(passRegex) && fullName.match(fullNameRegex)){
          axios.post(`https://igal-shopify-backend.herokuapp.com/user/addNew`, { newUser })
          .then(res => {
            setCurrentHeader('Success');
            setCurrentAlert('User created!');
            setShowAlert(true);
            setTimeout(()=>{
              window.location.href='https://xshopifyx.netlify.app/'
            },1500)
          }).catch(err=>{
            setCurrentHeader('Fail');
            setCurrentAlert('Email exists already');
            setShowAlert(true);
            setEmail('');
          })
        }else{
          setCurrentHeader('Fail');
          setCurrentAlert('One of the inputs are invalid form');
          setShowAlert(true);
        }
      }else{
        setCurrentHeader('Missing part');
        setCurrentAlert('please accept the terms and conditions');
        setShowAlert(true);
      }  
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
      <Modal {...props} size="md" centered  className='pop-screen-container'>
      <Modal.Header>
        <Modal.Title className='pop-screen-header'>
          <img src={logo}/>
          <h1>Account Register</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className='pop-screen-body'>
          <input placeholder='Full Name' title="Must contain 5-20 english letters" value={fullName}  name = {'fullName'} onChange={updateInputs} onKeyUp={register} maxlength="20"/>
          <input placeholder='Email' type={'email'} title="Must contain email format" value={email} name = {'email'} onChange={updateInputs} onKeyUp={register} maxlength="20"/>
          <input placeholder='Password' type={'password'} title="Must contain 4-12 english letters/patterns" value={password} name = {'password'} onChange={updateInputs} onKeyUp={register} maxlength="12"/>
        </form>
      </Modal.Body>
      <Form id='terms-of-use'>
          <Form.Check type='checkbox' label={'I have read and agreed to the '} id='terms-checkbox'/>
          <a href='https://www.termsandconditionsgenerator.com/live.php?token=a7FRRaUsMmx5TrBX83Hpo4AiHiwKfRna' target='_blank'>terms and conditions</a>
        </Form>
      <Modal.Footer className='pop-screen-footer'>
        <Button variant="success" onClick={register} disabled={email === '' || password ==='' || fullName === ''}>Register</Button>
        <Button variant="danger" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
      <ToastAlert alert = {currentAlert} show={showAlert} setShow = {setShowAlert} header={currentHeader}/>
    </Modal>
    );
}
export default Register;