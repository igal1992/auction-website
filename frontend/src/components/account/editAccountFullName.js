import {Modal,Button} from 'react-bootstrap'; 
import logo from '../../images/logo.jpg';
import React,{useState} from 'react';
import axios from 'axios';

function EditAccountFullName(props){
    const [fullName,setFullName] = useState(props.accountToEdit.fullName);
    
    const updateInputs =(e) =>{
        var value = e.target.value;
        var name = e.target.name;
        switch(name){
            case 'fullName':
                setFullName(value);
                break;
        }
    }

    const saveAccount = () =>{
        const user = {
            fullName,
            email: props.accountToEdit.email
        }
        if(fullName!==''){
            axios.post('https://igal-shopify-backend.herokuapp.com/user/editFullName',{user})
            .then(res=>{
                props.setShow(false);
                window.location.href="https://shopfiy.netlify.app/";
            }).catch(err=>{
                console.log(err);
            })
        }   
    }
    return(
    <Modal show={props.show} size="md" centered  className='pop-screen-container' animation={false}>
        <Modal.Header>
          <Modal.Title className='pop-screen-header'>
            <img src={logo}/>
            <h1>Edit {props.accountToEdit.email}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='pop-screen-body'>
            <input placeholder='fullName' name = {'fullName'} onChange={updateInputs} value={fullName} maxLength={'20'}/>
          </form>
        </Modal.Body>
        <Modal.Footer className='pop-screen-footer'>
          <Button variant="success" onClick={saveAccount}>Save</Button>
          <Button variant="danger" onClick={()=>{props.setShow(false)}}>Close</Button>
        </Modal.Footer>
    </Modal>
    );
}
export default EditAccountFullName;