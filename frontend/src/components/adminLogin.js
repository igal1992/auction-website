import { useState } from 'react';
import {Modal,Button} from 'react-bootstrap';
import logo from '../images/logo.jpg';
function AdminLogin () {
    const [showModal,setShowModal] = useState(true);
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const updateInputs =(e) =>{
        const name = e.target.name;
        const value = e.target.value;
        switch(name){
            case 'username':
                setUsername(value);
                break;
            case  'password':
                setPassword(value);
                break;
        }


    }
    const adminLogin =(e) =>{
        if(username !== '' && password !== ''){
            if(e.key === 'Enter' || e.key === undefined){
                if(username === 'admin' && password === 'Aa123456'){
                    setShowModal(false);
                    alert('login successful!')
                }
            }
        }
    }
    return(
        <Modal show={showModal} size="md" centered  className='register-login-container' animation={false}>
        <Modal.Header>
          <Modal.Title className='register-login-header'>
            <img src={logo}/>
            <h1>Admin Login</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='register-login-body'>
          <input placeholder='Username' value={username} name = {'username'} onChange={updateInputs} onKeyUp={adminLogin}/>
          <input placeholder='Password' type={'password'} value={password} name = {'password'} onChange={updateInputs} onKeyUp={adminLogin}/>
          </form>
        </Modal.Body>
        <Modal.Footer className='admin-footer'>
          <Button variant="success" onClick={adminLogin} disabled={username === '' || password === ''}>Login</Button>
        </Modal.Footer>
      </Modal>
        );
}
export default AdminLogin;