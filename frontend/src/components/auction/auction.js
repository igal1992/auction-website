import React,{useState,useEffect} from 'react';
import { imageExists, getAllProducts } from '../utils';
import imgNotFound from '../../images/imgNotFound.png';
import {Card,Button,Spinner} from 'react-bootstrap'
import AuctionHeader from './auctionHeader';
import {useSelector,useDispatch} from 'react-redux';
import {updateProducts,appendToCart} from '../../actions';
import axios from "axios";
import logo from '../../images/logo.jpg';
import { ToastAlert,sortDown,sortUp } from '../utils';
import {BiArrowToTop,BiArrowToBottom} from 'react-icons/bi';
import PaginationComp from '../pagination';


function Auction(){
    const [products,setProducts] = useState([]);
    const [loaded,setLoaded] = useState(false);
    const filteredProducts = useSelector(state =>state.filteredProducts);
    const loggedIn = useSelector(state =>state.isLogged);
    const [userData, setUserData] = useState([]);
    const [currentAlert,setCurrentAlert] = useState('');
    const [currentHeader,setCurrentHeader] = useState('');
    const [showAlert,setShowAlert] = useState(false);
    const [titleUp,setTitleUp] = useState(false);
    const [priceUp,setPriceUp] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage] = useState(12);
    const dispatch = useDispatch();
    useEffect(()=>{
        getAllProducts(setProducts);
    },[]);
    useEffect(()=>{
      const email = localStorage.getItem('userEmail');
      axios.post("http://localhost:8080/user/getData",{email})
      .then(res=>{
          setUserData(res.data);
      }).catch(err=>{
      })
    },[loggedIn]);
    useEffect(()=>{
      if(filteredProducts.length === 1 && Object.keys(filteredProducts[0]).length === 0 && products.length > 0){
        dispatch(updateProducts(products));
        setLoaded(true);
        }else if(filteredProducts.length > 0 || filteredProducts.length === 0){
        setLoaded(true);
      }
  },[products]);
  
  const addToCartProduct = (product) =>{
    dispatch(appendToCart(product));
  }
  const instantBuy = (product) =>{
      if(loggedIn){
          var newTransaction = {
              items:[product],
              price:product.price,
              buyer:userData.email
          }
          axios.post('http://localhost:8080/transactions/addNew',newTransaction)
              .then(res=>{
                  setCurrentHeader('Transaction success');
                  setCurrentAlert('Transaction succeeded!, Thanks for buying ;)');
                  setShowAlert(true);
              }).catch(err=>{
                  console.log(err);
              })
      }else{
          setCurrentHeader('Transaction failed');
          setCurrentAlert('Not logged in!');
          setShowAlert(true);
      }
  }
  const sortByElement = (productElemtent) =>{
    var tempData = filteredProducts;
    switch(productElemtent){
        case 'title':
            if(titleUp){
                tempData.sort(function(a,b){
                    return sortUp(a,b,productElemtent);
                });
                setTitleUp(false);
            }else{
                tempData.sort(function(a,b){
                    return sortDown(a,b,productElemtent);
                });
                setTitleUp(true);  
            }
            break;
        case 'price':
            if(priceUp){
                tempData.sort(function(a,b){
                    return (b.price-a.price)
                });
                setPriceUp(false);
            }else{
                tempData.sort(function(a,b){
                    return (a.price-b.price)
                });
                setPriceUp(true);  
            }
            break;
        default:
            break;
    }
    dispatch(updateProducts(tempData));
}
    const indexOfLastProduct = currentPage * postsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - postsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct,indexOfLastProduct);
    const paginate = (number) =>{
        setCurrentPage(number);
    }
    return(
        <div id={'auction-container'}>
          <AuctionHeader original = {products} setCurrentPage = {setCurrentPage}/>
          <div id={'auction-filter-name'} onClick={()=>{sortByElement('title')}}>Product name {titleUp?<BiArrowToBottom/>:<BiArrowToTop/>}</div>
          <div id={'auction-filter-price'} onClick={()=>{sortByElement('price')}}>Product price {priceUp?<BiArrowToBottom/>:<BiArrowToTop/>}</div>
            <div id={'products-container-outer'}>
              <ul id ={'products-container'}>
              {loaded && typeof filteredProducts[0] === 'object' && Object.keys(filteredProducts[0]).length !== 0?currentProducts.map((product)=>{
                  return(
                    <li className={'product-card-outer'} key={product.title}>
                      <Card className={'product-card'} >
                        <Card.Body className={'product-card-body'}>
                            <div className={'product-card-logo-container'}><Card.Img className={'product-card-logo'} src={logo}/></div>
                            <Card.Title className={'product-card-title'}>{product.title}</Card.Title>
                            <Card.Text className={'product-card-text'}>
                              {product.description}<br/>
                              <strong>{product.uploader}</strong><br/>
                              <strong>{product.price} $</strong>
                            </Card.Text>
                          </Card.Body>
                          <Card.Img className={'product-card-image'} src={imageExists(product.image)?product.image:imgNotFound}/>
                          <div className={'product-card-button-container'}>
                            <Button variant="success" className={'product-card-add'} onClick={()=>{addToCartProduct(product)}}>Add to Cart</Button>
                            <Button variant="success" className={'product-card-buy'} onClick={()=>{instantBuy(product)}}>Buy</Button>
                          </div>
                      </Card>
                    </li>
                  )
              }):<div id={'products-loader-container'}><Spinner animation="border" variant="dark" id={'products-loader'} /></div>}
              </ul>
            </div>
            <div style={{background:'#555555',width:'100%'}}> <PaginationComp postsPerPage = {postsPerPage} totalPosts = {filteredProducts.length} paginate={paginate} currentPage={currentPage} className={'pagination'}/></div>
            <ToastAlert alert = {currentAlert} show={showAlert} setShow = {setShowAlert} header={currentHeader}/>
          </div>
    );
}
export default Auction;