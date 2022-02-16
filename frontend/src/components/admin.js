import { useState } from 'react';
import { Container, Navbar,Nav, Button,ButtonGroup} from 'react-bootstrap';
import Accounts from './accounts';
import Products from './products';
import Stats from './stats';
import AdminLogin from './adminLogin';
function Admin () {
    const toggled = 'admin-toggle-selected';
    const notToggled = 'admin-toggle-notSelected';
    const statsOn = 'stats-container';
    const productsOn = 'products-container';
    const accountsOn = 'accounts-container';
    const hide = 'hide';
    const [toggleStats,setToggleStats] = useState(notToggled);
    const [toggleProducts,setToggleProducts] = useState(toggled);
    const [toggleAccounts,setToggleAccounts] = useState(notToggled);
    const [statsContainer,setStatsContainer] = useState(hide);
    const [productsContainer,setProductsContainer] = useState(productsOn);
    const [accountsContainer,setAccountsContainer] = useState(hide);


    //<AdminLogin/>
    const toggle = (e) =>{
        const name = e.target.name;
        switch(name){
            case 'products':
                setToggleStats(notToggled);
                setToggleProducts(toggled);
                setToggleAccounts(notToggled);
                setProductsContainer(productsOn);
                setStatsContainer(hide);
                setAccountsContainer(hide);
                break;
            case 'accounts':
                setToggleStats(notToggled);
                setToggleProducts(notToggled);
                setToggleAccounts(toggled);
                setProductsContainer(hide);
                setStatsContainer(hide);
                setAccountsContainer(accountsOn);
                break;
            case 'stats':
                setToggleStats(toggled);
                setToggleProducts(notToggled);
                setToggleAccounts(notToggled);
                setProductsContainer(hide);
                setStatsContainer(statsOn);
                setAccountsContainer(hide);
                break;
        }
    }
    return(
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav id="admin-toggle-container">
                        <ButtonGroup>
                            <Button className={toggleProducts} onClick={toggle} name={'products'}>products</Button>
                            <Button className={toggleAccounts} onClick={toggle} name={'accounts'}>accounts</Button>
                            <Button className={toggleStats} onClick={toggle} name={'stats'}>stats</Button>
                        </ButtonGroup>
                    </Nav>
                </Container>
            </Navbar>
            <Stats className={statsContainer}/>
            <Accounts className={accountsContainer}/>
            <Products className={productsContainer}/>
        </div>
        );
}
export default Admin;