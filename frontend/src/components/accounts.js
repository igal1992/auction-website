import {Button, ButtonGroup, Table} from 'react-bootstrap'
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import EditAccount from './editAccount';
import {BiArrowToTop,BiArrowToBottom} from 'react-icons/bi';
import {sortDown,sortUp} from './utils';
import {getAllAccounts} from './utils';


function Accounts(props){
    const [accounts,setAccounts] = useState([]);
    const [showEditModal,setShowEditModal] = useState(false);
    const [emailUp,setEmailUp] = useState(false);
    const [fullNameUp,setFullNameUp] = useState(false);
    const [accountToEdit,setAccountToEdit] = useState();
    var counter = 1;
    useEffect(()=>{
        getAllAccounts(setAccounts);
    },[]);

    const removeItem = (emailToRemove) =>{
        axios.post('http://localhost:8080/user/delete',{emailToRemove})
        .then(res=>{
            getAllAccounts(setAccounts);
        }).catch(err=>{
            console.log(err);
        })
    }
    
    const sortByElemnt = (accountElement) =>{
        var tempAccounts = accounts;
        switch(accountElement){
            case 'email':
                if(emailUp){
                    tempAccounts.sort(function(a,b){
                        return sortUp(a,b,accountElement);
                    });
                    setEmailUp(false);
                }else{
                    tempAccounts.sort(function(a,b){
                        return sortDown(a,b,accountElement);
                    });
                    setEmailUp(true);  
                }
                break;
            case 'fullName':
                if(fullNameUp){
                    tempAccounts.sort(function(a,b){
                        return sortUp(a,b,accountElement);
                    });
                    setFullNameUp(false);
                }else{
                    tempAccounts.sort(function(a,b){
                        return sortDown(a,b,accountElement);
                    });
                    setFullNameUp(true);  
                }
                break;
            default:
                break;
        }
        setAccounts(tempAccounts);
    }
return(
    <div className={props.className}>
        <Table variant={"dark"} striped hover id='products-table'>
            <thead>
                <tr>
                <th>#</th>
                <th onClick={()=>{sortByElemnt('fullName')}}>Full Name {fullNameUp?<BiArrowToBottom/>:<BiArrowToTop/>}</th>
                <th onClick={()=>{sortByElemnt('email')}}>Email {emailUp?<BiArrowToBottom/>:<BiArrowToTop/>}</th>
                <th >Actions</th>
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