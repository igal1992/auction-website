import {Modal,Button} from 'react-bootstrap'; 
import logo from '../../images/logo.jpg';
import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {isLoggedOut} from '../../actions';

function EditAccountEmail(props){
    const [email,setEmail] = useState(props.accountToEdit.email);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const updateInputs =(e) =>{
        var value = e.target.value;
        var name = e.target.name;
        switch(name){
            case 'email':
                setEmail(value);
                break;
            default:
              break;
        }
    }

    const saveAccount = () =>{
        const user = {
            email,
            emailToEdit: props.accountToEdit.email
        }
        if(email!==''){
            axios.post('http://localhost:8080/user/editEmail',{user})
            .then(res=>{
                props.setShow(false);
                localStorage.removeItem('userEmail');
                localStorage.removeItem('token');
                dispatch(isLoggedOut());
                navigate('/',{replace: true});
            }).catch(err=>{
                console.log(err);
            })
        }   
    }
    return(
    <Modal show={props.show} size="md" centered  className='pop-screen-container' animation={false}>
        <Modal.Header>
          <Modal.Title className='pop-screen-header'>
            <img src={logo} alt={'logo'}/>
            <h1>Edit {props.accountToEdit.email}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='pop-screen-body'>
            <input placeholder='email' name = {'email'} onChange={updateInputs} value={email} maxLength={'20'}/>
            <p>You'll be logged out after</p>
          </form>
        </Modal.Body>
        <Modal.Footer className='pop-screen-footer'>
          <Button variant="success" onClick={saveAccount}>Save</Button>
          <Button variant="danger" onClick={()=>{props.setShow(false)}}>Close</Button>
        </Modal.Footer>
    </Modal>
    );
}
export default EditAccountEmail;