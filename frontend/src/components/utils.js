import axios from "axios";
import {Toast,ToastContainer} from 'react-bootstrap'

export const sortUp = (a,b,element)=>{
    if(a[element] < b[element]){return 1;}
    if(a[element] > b[element]) { return -1; }
    return 0;
}

export const sortDown = (a,b,element)=>{
    if(a[element] < b[element]){return -1;}
    if(a[element] > b[element]) { return 1; }
    return 0;
}

export const getTopFiveSells = (setState) =>{
    axios.get('https://igal-shopify-backend.herokuapp.com/transactions/topSells')
    .then(res=>{
        setState(res.data);
    }).catch(err=>{
        console.log(err);
    })
}

export const getUniqueSells = (setState) =>{
    axios.get('https://igal-shopify-backend.herokuapp.com/transactions/uniqueSells')
    .then(res=>{
        setState(res.data);
    }).catch(err=>{
        console.log(err);
    })
}

export const getRecentSells = (setState) =>{
    axios.get('https://igal-shopify-backend.herokuapp.com/transactions/recentSells')
    .then(res=>{
        setState(res.data);
    }).catch(err=>{
        console.log(err);
    })
}

export const getAllAccounts = (setState) =>{
    axios.get('https://igal-shopify-backend.herokuapp.com/user/getAll')
    .then(res=>{
        setState(res.data);
    }).catch(err=>{
        console.log(err);
    })
}

export const getAllProducts =(setState) =>{
    axios.get('https://igal-shopify-backend.herokuapp.com/product/getAll')
    .then(res=>{
        setState(data=>{
            return (res.data)
        });
    }).catch(err=>{
        console.log(err);
    })
}
export function imageExists(image_url){

    var http = new XMLHttpRequest();
        http.open('HEAD', image_url, true);
        http.withCredentials = true;
        http.send();

        return http.status !== 404;
}
export const getUserData = (email,setState) =>{
    axios.post("https://igal-shopify-backend.herokuapp.com/user/getData",{email})
    .then(res=>{
        setState(res.data);
    }).catch(err=>{
        console.log(err);
    })
}
export const getUserTransactions = (email,setState) =>{
    axios.post("https://igal-shopify-backend.herokuapp.com/transactions/getAllByEmail",{email})
    .then(res=>{
        setState(res.data);
    }).catch(err=>{
        console.log(err);
    })
}
export const getUserProducts = (email,setState) =>{
    axios.post("https://igal-shopify-backend.herokuapp.com/product/getUserProducts",{email})
    .then(res=>{
        setState(res.data);
    }).catch(err=>{
        console.log(err);
    })
}
export const ToastAlert = (props) =>{
    return(
        <ToastContainer id={'alert-container'}>
        <Toast onClose={() => props.setShow(false)} show={props.show} delay={3000} autohide >
          <Toast.Header id={'alert-header'} closeButton>
            <strong className="me-auto">{props.header}</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body id={'alert-body'}>{props.alert}</Toast.Body>
        </Toast>
      </ToastContainer>
    )
}