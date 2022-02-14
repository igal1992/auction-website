import React, { useState, useEffect } from 'react';

function Home(){
    const [isLoaded, setIsLoaded] = useState(false);//a boolean value to determined if to run useEffect
    const [products, setProducts] = useState([]);//a list of all products
    const [error, setError] = useState(null);//an error value if fetching failed
    const [shoppingCart, setShoppingCart] = useState([]);//a list of all items in the shopping cart
    const [totalPrice, setTotalPrice] = useState("0");//total price of shopping cart items
    const getData = ()=>{
        fetch("https://whistbackend.herokuapp.com/product/getAll")
        .then(res => res.json())
        .then((result)=>{
            setIsLoaded(true);
            setProducts(result);
        },
        (error)=>{
            setIsLoaded(true);
            setError(error); 
            }
        )
    }
    useEffect(() => {
        getData();
    },[isLoaded])
    const payCart = ()=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({items:shoppingCart,price:totalPrice})
        };
        fetch("https://whistbackend.herokuapp.com/transactions/addNew",requestOptions)
        setShoppingCart([]);
        setTotalPrice("0");
    }
    return(
        <div>
            <section id = "container">
                <h1 id = "title">Home</h1>
                <div id ="homeProductSection">
                {products.map((product)=>{
                    return(
                        <div className="productHome">
                            <img src={product.image} className="productPic"></img>
                            <div className='productHomeContent'>
                                <h2 className="productTitle">{product.title}</h2>
                                <h5 >Description: </h5><p className="productDescription">{product.description}</p>
                                <p className="productPrice">Price: {product.price}$</p>
                            </div>
                            <button className="BuyButton" onClick={()=> {
                                setShoppingCart(shoppingCart =>[...shoppingCart,product])
                                setTotalPrice(parseInt(totalPrice)+parseInt(product.price))}
                                }>Buy</button>
                        </div>
                    )
                })}
                <div id ="shoppingCart">
                        <h4 id="shoppingCartTitle">Shopping Cart <span id="numOfItems">{shoppingCart.length}</span></h4>
                        <div id="shoppingCartContent">
                                {shoppingCart.map((item)=>{return(
                            <div id="shoppingcartItem">
                                <p>{item.title}</p>
                                <p className='itemPrice'>{item.price}$</p>
                            </div>)})}
                            <div id="shoppingcartItem">
                                <p>Total</p>
                                <p className='itemPrice'>{totalPrice}$</p>
                            </div>
                                <button id="payButton" onClick={payCart}>Pay</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default Home;