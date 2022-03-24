import {Modal,Button} from 'react-bootstrap'; 
import logo from '../../images/logo.jpg';
import React,{useState} from 'react';
import axios from 'axios';
import {isLoggedOut} from '../../actions';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';




function DeleteAccount(props){
    const [password,setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateInputs =(e) =>{
        var value = e.target.value;
        var name = e.target.name;
        switch(name){
            case 'password':
                setPassword(value);
                break;
            default:
              break;
        }
    }

    const saveAccount = () =>{
        const user = {
            password,
            email: props.accountToEdit.email
        }
        if(password!==''){
            axios.post('https://igal-shopify-backend.herokuapp.com/user/delete',{user})
            .then(res=>{
                props.setShow(false);
                dispatch(isLoggedOut());
                localStorage.removeItem("token");
                localStorage.removeItem("userEmail");
                navigate('/',{replace: true});
            }).catch(err=>{
                alert('Old password is not Correct');
            })
        }   
    }
    return(
    <Modal show={props.show} size="md" centered  className='pop-screen-container' animation={false}>
        <Modal.Header>
          <Modal.Title className='pop-screen-header'>
            <img src={logo} alt={'logo'}/>
            <h1>Delete {props.accountToEdit.email}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='pop-screen-body'>
            <input placeholder='password' name = {'password'} onChange={updateInputs} value={password} maxLength={'12'} type={'password'}/>
          </form>
        </Modal.Body>
        <Modal.Footer className='pop-screen-footer'>
          <Button variant="success" onClick={saveAccount}>Save</Button>
          <Button variant="danger" onClick={()=>{props.setShow(false)}}>Close</Button>
        </Modal.Footer>
    </Modal>
    );
}
export default DeleteAccount;