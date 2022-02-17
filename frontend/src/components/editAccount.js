import {Modal,Button} from 'react-bootstrap'; 
import logo from '../images/logo.jpg';
import React,{useState,useEffect} from 'react';
import axios from 'axios';

function EditAccount(props){
    const [email,setEmail] = useState('');
    const [fullName,setFullName] = useState('');

    useEffect(()=>{
        if(props.show){
            setEmail(props.accountToEdit.email);
            setFullName(props.accountToEdit.fullName);
        }
    },[props.show])
    
    const updateInputs =(e) =>{
        var value = e.target.value;
        var name = e.target.name;
        switch(name){
            case 'email':
                setEmail(value);
                break;
            case 'fullName':
                setFullName(value);
                break;
        }
    }

    const saveAccount = () =>{
        const newAccount = {
            email,
            fullName,
            emailToEdit: props.accountToEdit.email
        }
        console.log(newAccount)
        if(email!==''&& fullName!==''){
            axios.post('http://localhost:8080/user/edit',{newAccount})
            .then(res=>{
                props.setShow(false);
                axios.get('http://localhost:8080/user/getAll').then(res=>{
                    props.updateAccounts(res.data);
                })
            }).catch(err=>{
                console.log('oops something went wrong!');
            })
        }   
    }
    return(
    <Modal show={props.show} size="md" centered  className='register-login-container' animation={false}>
        <Modal.Header>
          <Modal.Title className='register-login-header'>
            <img src={logo}/>
            <h1>Edit Account</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='register-login-body'>
            <input placeholder='email' name = {'email'} onChange={updateInputs} value={email}/>
            <input placeholder='fullName' name = {'fullName'} onChange={updateInputs} value={fullName}/>
          </form>
        </Modal.Body>
        <Modal.Footer className='register-login-footer'>
          <Button variant="success" onClick={saveAccount}>Save</Button>
          <Button variant="danger" onClick={()=>{props.setShow(false)}}>Close</Button>
        </Modal.Footer>
    </Modal>
    );
}
export default EditAccount;