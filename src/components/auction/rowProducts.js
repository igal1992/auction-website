import {useSelector} from 'react-redux';
import { imageExists} from '../utils';
import imgNotFound from '../../images/imgNotFound.png';
import {Button,Spinner} from 'react-bootstrap';

function RowProducts(props){
    const filteredProducts = useSelector(state =>state.filteredProducts);
    return(
        <ul id ={props.id}>
              {props.loaded && typeof filteredProducts[0] === 'object' && Object.keys(filteredProducts[0]).length !== 0?props.currentProducts.map((product)=>{
                  return(
                    <li className={'product-row-outer'} key={product.title}>
                        <img className={'product-row-image'} src={imageExists(product.image)?product.image:imgNotFound} alt='product'/>
                        <div className={'product-row'} >
                            <div className={'product-row-body'}>
                                <h2 className={'product-row-title'}>{product.title}</h2>
                                <div className={'product-row-text'}>
                                {product.description}<br/>
                                <strong>{product.uploader}</strong><br/>
                                </div>
                            </div>
                            <div className={'product-row-button-container'}>
                                <div className={'row-product-button-inner'}><strong>{product.price} $</strong></div>
                                <div className={'row-product-button-inner'}><Button variant="success" className={'product-row-add'} onClick={()=>{props.addToCartProduct(product)}}>Add to Cart</Button> <Button variant="success" className={'product-row-buy'} onClick={()=>{props.instantBuy(product)}}>Buy</Button></div>
                            </div>
                        </div>
                    </li>
                  )
              }):<div id={'products-loader-container'}><Spinner animation="border" variant="dark" id={'products-loader'} /></div>}
        </ul>
    )
}
export default RowProducts;