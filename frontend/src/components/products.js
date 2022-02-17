import {Button, ButtonGroup, Table} from 'react-bootstrap'
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import AddModal from './addModal';
import EditModal from './editModal';
function Products(props){
    const [products,setProducts] = useState([]);
    const [showAddModal,setShowAddModal] = useState(false);
    const [showEditModal,setShowEditModal] = useState(false);
    const [productToEdit,setProductToEdit] = useState();
    var counter = 1;
    const getAllProducts =() =>{
        axios.get('http://localhost:8080/product/getAll')
        .then(res=>{
            setProducts(res.data);
        }).catch(err=>{
            console.log('oops something went wrong!');
        })
    }
    useEffect(()=>{
        getAllProducts();
    },[]);
    const removeItem = (titleToRemove) =>{
        axios.post('http://localhost:8080/product/delete',{titleToRemove})
        .then(res=>{
            getAllProducts();
        }).catch(err=>{
            console.log(err);
        })
    }
return(
    <div className={props.className}>
        <div className="d-grid gap-2" style={{height:'50px'}}>
            <Button variant="info" onClick={()=>{setShowAddModal(true)}} style={{fontSize:'2rem'}}>Add Product</Button>
        </div>
        <Table variant={"dark"} striped hover id='products-table'>
            <thead>
                <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Uploader</th>
                <th>Catagory</th>
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