import {Button, ButtonGroup, Table} from 'react-bootstrap'
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import EditAccount from './editAccount';

function Accounts(props){
    const [accounts,setAccounts] = useState([]);
    const [showEditModal,setShowEditModal] = useState(false);
    const [accountToEdit,setAccountToEdit] = useState();

    var counter = 1;
    const getAllAccounts =() =>{
        axios.get('http://localhost:8080/user/getAll')
        .then(res=>{
            setAccounts(res.data);
        }).catch(err=>{
            console.log('oops something went wrong!');
        })
    }
    useEffect(()=>{
        getAllAccounts();
    },[]);
    const removeItem = (emailToRemove) =>{
        axios.post('http://localhost:8080/user/delete',{emailToRemove})
        .then(res=>{
            getAllAccounts();
        }).catch(err=>{
            console.log(err);
        })
    }
return(
    <div className={props.className}>
        <Table variant={"dark"} striped hover id='products-table'>
            <thead>
                <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {accounts.map((account)=>{
                    return(
                            <tr key={account.email}>
                                <td>{counter++}</td>
                                <td>{account.fullName}</td>
                                <td>{account.email}</td>
                                <td><ButtonGroup className="d-grid gap-2">
                                        <Button variant="warning" onClick={()=>{setShowEditModal(true); setAccountToEdit(account)}}>Edit</Button>
                                        <Button variant="danger" onClick={()=>{removeItem(account.email)}}>Remove</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )
                })}
            </tbody>
        </Table>
        <EditAccount show ={showEditModal} setShow={setShowEditModal} updateAccounts={setAccounts} accountToEdit={accountToEdit}/>
    </div>
)
}
export default Accounts;