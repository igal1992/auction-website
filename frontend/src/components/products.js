import {Button, ButtonGroup, Table} from 'react-bootstrap'
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import AddModal from './addModal';
import EditModal from './editModal';
import {BiArrowToTop,BiArrowToBottom} from 'react-icons/bi';
import {sortDown,sortUp,getAllProducts} from './utils';

function Products(props){
    const [products,setProducts] = useState([]);
    const [showAddModal,setShowAddModal] = useState(false);
    const [showEditModal,setShowEditModal] = useState(false);
    const [productToEdit,setProductToEdit] = useState();
    const [titleUp,setTitleUp] = useState(false);
    const [catagoryUp,setCatagoryUp] = useState(false);
    const [priceUp,setPriceUp] = useState(false);
    const [uploaderUp,setUploaderUp] = useState(false);
    const [descriptionUp,setDescriptionUp] = useState(false);
    var counter = 1;
    
    useEffect(()=>{
        getAllProducts(setProducts);
    },[]);

    const removeItem = (titleToRemove) =>{
        axios.post('http://localhost:8080/product/delete',{titleToRemove})
        .then(res=>{
            getAllProducts(setProducts);
        }).catch(err=>{
            console.log(err);
        })
    }

    const sortByElement = (productElemtent) =>{
        var tempProducts = products;
        switch(productElemtent){
            case 'title':
                if(titleUp){
                    tempProducts.sort(function(a,b){
                        return sortUp(a,b,productElemtent);
                    });
                    setTitleUp(false);
                }else{
                    tempProducts.sort(function(a,b){
                        return sortDown(a,b,productElemtent);
                    });
                    setTitleUp(true);  
                }
                break;
            case 'price':
                if(priceUp){
                    tempProducts.sort(function(a,b){
                        return (b.price-a.price)
                    });
                    setPriceUp(false);
                }else{
                    tempProducts.sort(function(a,b){
                        return (a.price-b.price)
                    });
                    setPriceUp(true);  
                }
                break;
            case 'uploader':
                if(uploaderUp){
                    tempProducts.sort(function(a,b){
                        return sortUp(a,b,productElemtent);
                    });
                    setUploaderUp(false);
                }else{
                    tempProducts.sort(function(a,b){
                        return sortDown(a,b,productElemtent)
                    });
                    setUploaderUp(true);  
                }
                break;
            case 'catagory':
                if(catagoryUp){
                    tempProducts.sort(function(a,b){
                        return sortUp(a,b,productElemtent);
                    });
                    setCatagoryUp(false);
                }else{
                    tempProducts.sort(function(a,b){
                        return sortDown(a,b,productElemtent)
                    });
                    setCatagoryUp(true);  
                }
                break;
            case 'description':
                if(descriptionUp){
                    tempProducts.sort(function(a,b){
                        return sortUp(a,b,productElemtent);
                    });
                    setDescriptionUp(false);
                }else{
                    tempProducts.sort(function(a,b){
                        return sortDown(a,b,productElemtent)
                    });
                    setDescriptionUp(true);  
                }
                break;
            default:
                break;
        }
        setProducts(tempProducts);
    }
return(
    <div className={props.className}>
        <div className="d-grid gap-2">
            <Button variant="outline-dark" onClick={()=>{setShowAddModal(true)}} id={'product-add'}>Add Product</Button>
        </div>
        <Table variant={"dark"} striped hover id='products-table'>
            <thead>
                <tr>
                <th>#</th>
                <th onClick={()=>{sortByElement('title')}}>Product Name {titleUp?<BiArrowToBottom/>:<BiArrowToTop/>}</th>
                <th onClick={()=>{sortByElement('description')}}>Description {descriptionUp?<BiArrowToBottom/>:<BiArrowToTop/>}</th>
                <th onClick={()=>{sortByElement('price')}}>Price {priceUp?<BiArrowToBottom/>:<BiArrowToTop/>}</th>
                <th onClick={()=>{sortByElement('uploader')}}>Uploader {uploaderUp?<BiArrowToBottom/>:<BiArrowToTop/>}</th>
                <th onClick={()=>{sortByElement('catagory')}}>Catagory {catagoryUp?<BiArrowToBottom/>:<BiArrowToTop/>}</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product)=>{
                    return(
                            <tr key={product.title}>
                                <td>{counter++}</td>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>{product.price} $</td>
                                <td>{product.uploader?product.uploader:"admin"}</td>
                                <td>{product.catagory?product.catagory:"admin catagory"}</td>
                                <td><ButtonGroup className="d-grid gap-2">
                                        <Button variant="warning" onClick={()=>{setShowEditModal(true); setProductToEdit(product)}}>Edit</Button>
                                        <Button variant="danger" onClick={()=>{removeItem(product.title)}}>Remove</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )
                })}
            </tbody>
        </Table>
        <AddModal show ={showAddModal} setShow={setShowAddModal} updateProducts={setProducts}/>
        <EditModal show ={showEditModal} setShow={setShowEditModal} updateProducts={setProducts} productToEdit={productToEdit}/>
    </div>
)
}
export default Products;