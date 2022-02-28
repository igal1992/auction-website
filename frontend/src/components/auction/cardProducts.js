import {useSelector} from 'react-redux';
import logo from '../../images/logo.jpg';
import { imageExists} from '../utils';
import imgNotFound from '../../images/imgNotFound.png';
import {Card,Button,Spinner} from 'react-bootstrap';

function CardProducts(props){
    const filteredProducts = useSelector(state =>state.filteredProducts);
    return(
        <ul id ={props.id}>
              {props.loaded && typeof filteredProducts[0] === 'object' && Object.keys(filteredProducts[0]).length !== 0?props.currentProducts.map((product)=>{
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
                            <Button variant="success" className={'product-card-add'} onClick={()=>{props.addToCartProduct(product)}}>Add to Cart</Button>
                            <Button variant="success" className={'product-card-buy'} onClick={()=>{props.instantBuy(product)}}>Buy</Button>
                          </div>
                      </Card>
                    </li>
                  )
              }):<div id={'products-loader-container'}><Spinner animation="border" variant="dark" id={'products-loader'} /></div>}
        </ul>
    )
}
export default CardProducts;