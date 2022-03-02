import React,{useState,useEffect} from 'react';
import { getAllProducts } from '../utils';
import AuctionHeader from './auctionHeader';
import {useSelector,useDispatch} from 'react-redux';
import {updateProducts,appendToCart} from '../../actions';
import axios from "axios";
import { ToastAlert,sortDown,sortUp } from '../utils';
import PaginationComp from '../pagination';
import CardProducts from './cardProducts';
import RowProducts from './rowProducts';


function Auction(){
    const cardIdContainer = 'products-container';
    const hidden = 'hide';
    const rowIdContainer = 'row-products-container';
    const [cardId,setCardId] = useState(hidden);
    const [rowId,setRowId] = useState(hidden);
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
    const [width, setWidth] = useState(0);
  
    useEffect(() => {
      function handleResize() {
        setWidth(window.innerWidth);
        if(window.innerWidth < 1024){
            setCardId(hidden);
            setRowId(rowIdContainer);
        }else if(window.innerWidth > 1024){
            setCardId(cardIdContainer);
            setRowId(hidden);
        }
      }
      
      window.addEventListener("resize", handleResize)
      
      handleResize()
      
      return () => { 
        window.removeEventListener("resize", handleResize)
      }
    }, [setWidth])
  
    useEffect(()=>{
        getAllProducts(setProducts);
        document.title='store';
    },[]);
    useEffect(()=>{
      const email = localStorage.getItem('userEmail');
      axios.post("https://igal-shopify-backend.herokuapp.com/user/getData",{email})
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
          axios.post('https://igal-shopify-backend.herokuapp.com/transactions/addNew',newTransaction)
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
          <AuctionHeader original = {products} setCurrentPage = {setCurrentPage} sortByElement = {sortByElement} priceUp= {priceUp} titleUp = {titleUp}/>
            <div id={'products-container-outer'}>
                <CardProducts currentProducts={currentProducts} loaded={loaded} id={cardId} instantBuy={instantBuy} addToCartProduct={addToCartProduct}/>
                <RowProducts currentProducts={currentProducts} loaded={loaded} id={rowId} instantBuy={instantBuy} addToCartProduct={addToCartProduct}/>
            </div>
            <div style={{background:'#555555',width:'100%'}}> <PaginationComp postsPerPage = {postsPerPage} totalPosts = {filteredProducts.length} paginate={paginate} currentPage={currentPage} className={'pagination'}/></div>
            <ToastAlert alert = {currentAlert} show={showAlert} setShow = {setShowAlert} header={currentHeader}/>
          </div>
    );
}
export default Auction;