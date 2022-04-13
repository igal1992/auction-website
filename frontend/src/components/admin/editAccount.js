import {Modal,Button} from 'react-bootstrap'; 
import logo from '../../assets/images/logo.jpg';
import '../popUpWindow.css';
import React,{useState,useEffect} from 'react';
import {adminUpdateAccountAndReload} from "../../services/igalStoreApi"

function EditAccount({show,accountToEdit,setShow,updateAccounts}){
    const [email,setEmail] = useState('');
    const [fullName,setFullName] = useState('');

    useEffect(()=>{
        if(show){
            setEmail(accountToEdit.email);
            setFullName(accountToEdit.fullName);
        }
    },[show])
    
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
            default:
                    break;
        }
    }

    const saveAccount = () =>{
        const newAccount = {
            email,
            fullName,
            emailToEdit: accountToEdit.email
        }
        if(email!==''&& fullName!==''){
            adminUpdateAccountAndReload(newAccount,setShow,updateAccounts);
        }   
    }
    return(
    <Modal show={show} size="md" centered  className='pop-screen-container' animation={false}>
        <Modal.Header>
          <Modal.Title className='pop-screen-header'>
            <img src={logo} alt='logo'/>
            <h1>Edit Account</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='pop-screen-body'>
            <input placeholder='email' name = {'email'} onChange={updateInputs} value={email}/>
            <input placeholder='fullName' name = {'fullName'} onChange={updateInputs} value={fullName}/>
          </form>
        </Modal.Body>
        <Modal.Footer className='pop-screen-footer'>
          <Button variant="success" onClick={saveAccount}>Save</Button>
          <Button variant="danger" onClick={()=>{setShow(false)}}>Close</Button>
        </Modal.Footer>
    </Modal>
    );
}
export default EditAccount;