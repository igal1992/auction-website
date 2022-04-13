import DeleteAccount from "./deleteAccount";
import EditAccountEmail from "./editAccountEmail";
import EditAccountFullName from "./editAccountFullName";
import EditAccountPassword from "./editAccountPassword";
import React,{useState} from 'react';

function Security({userData, setAccount}){
    const [showEditEmail,setShowEditEmail] = useState(false);
    const [showDeleteAccount,setShowDeleteAccount] = useState(false);
    const [showEditPassword,setShowEditPassword] = useState(false);
    const [showEditFullName,setShowEditFullName] = useState(false);

    return(
        <div id={'my-account-security-outer'}>
            <section className={'my-account-security-info-container'}>
                <h2 className={'my-account-security-section-title'}>CREDENTIALS</h2>
                <div className={'my-account-security-section-body'}>
                    <h5>Full Name</h5>
                    <div>
                        <p className={'my-account-security-section-body-p'}>{userData.fullName}</p>
                        <p className={'my-account-security-section-body-edit'} onClick={()=>{setShowEditFullName(true)}}>Edit</p>
                    </div>
                    <h5>Account Email</h5>
                    <div>
                        <p className={'my-account-security-section-body-p'}>{userData.email}</p>
                        <p className={'my-account-security-section-body-edit'}onClick={()=>{setShowEditEmail(true)}}>Edit</p>
                    </div>
                    <div>
                        <h5>Change Password</h5>
                        <p className={'my-account-security-section-body-edit'}onClick={()=>{setShowEditPassword(true)}}>Edit</p>
                    </div>
                </div>
            </section>
            <section className={'my-account-security-danger-container'}>
                <h2 className={'my-account-security-section-title'}>Danger</h2>
                <div className={'my-account-security-section-body'}>
                    <div>
                        <h5>Delete Account</h5>
                        <p className={'my-account-security-section-body-delete'} onClick={()=>{setShowDeleteAccount(true)}}>Delete</p>
                    </div>
                </div>
            </section>
            <EditAccountFullName show ={showEditFullName} setShow={setShowEditFullName} accountToEdit={userData}/>
            <EditAccountPassword show ={showEditPassword} setShow={setShowEditPassword} accountToEdit={userData}/>
            <EditAccountEmail show ={showEditEmail} setShow={setShowEditEmail} accountToEdit={userData}/>
            <DeleteAccount show ={showDeleteAccount} setShow={setShowDeleteAccount} accountToEdit={userData}/>
        </div>
    )
}
export default Security;