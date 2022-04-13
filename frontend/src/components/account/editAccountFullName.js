import {Modal,Button} from 'react-bootstrap'; 
import logo from '../../assets/images/logo.jpg';
import React,{useState} from 'react';
import {userEditFullName} from "../../services/igalStoreApi";

function EditAccountFullName({accountToEdit,setShow,show}){
    const [fullName,setFullName] = useState(accountToEdit.fullName);
    
    const updateInputs =(e) =>{
        var value = e.target.value;
        var name = e.target.name;
        switch(name){
            case 'fullName':
                setFullName(value);
                break;
            default:
              break;
        }
    }

    const saveAccount = () =>{
        const user = {
            fullName,
            email: accountToEdit.email
        }
        if(fullName!==''){
          userEditFullName(setShow,user);
        }   
    }
    return(
    <Modal show={show} size="md" centered  className='pop-screen-container' animation={false}>
        <Modal.Header>
          <Modal.Title className='pop-screen-header'>
            <img src={logo} alt={'logo'}/>
            <h1>Edit {accountToEdit.email}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='pop-screen-body'>
            <input placeholder='fullName' name = {'fullName'} onChange={updateInputs} value={fullName} maxLength={'20'}/>
          </form>
        </Modal.Body>
        <Modal.Footer className='pop-screen-footer'>
          <Button variant="success" onClick={saveAccount}>Save</Button>
          <Button variant="danger" onClick={()=>{setShow(false)}}>Close</Button>
        </Modal.Footer>
    </Modal>
    );
}
export default EditAccountFullName;