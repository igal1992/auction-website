import React, { useEffect, useState } from 'react';
import {Button, Modal} from 'react-bootstrap';

function Admin(){
    const [products, setProducts] = useState([]);//a list of all products
    const [error, setError] = useState(null);//an error value if fetching failed
    const [isOpen, setIsOpen] = useState(false);//a bollean value to determined if add modal box is open
    const [description, setDescription] = useState("");//description value stored here 
    const [price, setPrice] = useState("");//price value stored here
    const [title, setTitle] = useState("");//title value stored here
    const [imageUrl, setImageUrl] = useState("");//image url value stored here
    const [isLoaded, setIsLoaded] = useState(false);//a boolean value to determined if to run useEffect
    const [currentTitle,setCurrentTitle] = useState("");//current title stored here for edit func
    const [isEdit,setIsEdit] = useState(false);//a boolean value to switch between edit modal box view and add modal box view


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
    useEffect (() => {
        getData();
    },[isLoaded])
    const deleteThis = (productTitle) =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({title:productTitle})
        };
        fetch("https://whistbackend.herokuapp.com/product/delete",requestOptions).then(res=>{
            setIsLoaded(false)
        })
    }
    const addNewProduct = () =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({title:title,price:price,description:description,image:imageUrl})
        };
        fetch("https://whistbackend.herokuapp.com/product/addNew",requestOptions).then(res=>{
            setPrice("");
            setTitle("");
            setDescription("");
            setImageUrl("");
            setIsLoaded(false);
            setIsOpen(false);   
        })
}
    const editProduct = () =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({title:title,price:price,description:description,image:imageUrl,titletoEdit:currentTitle})
        };
        fetch("https://whistbackend.herokuapp.com/product/edit",requestOptions)
        .then(res=>{
            setPrice("");
            setTitle("");
            setDescription("");
            setImageUrl("");
            setIsLoaded(false);
            setIsOpen(false);
        })
    }
    return(
        <div>
        <section id = "container">
            <h1 id = "title">Admin</h1>
            <section id="adminSection">
                <div id = "addButton">
                <button className={"styledButtons"} onClick={()=>{setIsOpen(true);setIsEdit(false)}}>Add</button>
                </div>
                <table id="adminTable">
                    <tr>
                        <th>title</th>
                        <th>price</th>
                        <th>option</th>
                    </tr>
                    {products.map((product)=>{
                        return(
                            <tr>
                                <td>{product.title}</td>
                                <td>{product.price}$</td>
                                <td>
                                    <button className={"styledButtons"} id="editB" onClick={() => {setIsOpen(true); setCurrentTitle(product.title);setPrice(product.price);setTitle(product.title);setDescription(product.description);setImageUrl(product.image);setIsEdit(true)}}>Edit</button>
                                    <button className={"styledButtons"} onClick={()=> deleteThis(product.title)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </section>
        </section>
        <Modal show={isOpen}>
            {isEdit?<Modal.Header>Edit Product</Modal.Header>:<Modal.Header>Add Product</Modal.Header>}
            <Modal.Body>
                <p>enter title</p><input placeholder='title' value ={title} onChange={e=>setTitle(e.target.value)}></input>
                <p>enter price</p><input placeholder='price'  value ={price} onChange={e=>setPrice(e.target.value)}></input>
                <p>enter description(max 50 characters)</p><input placeholder='description'  value ={description} onChange={e=>setDescription(e.target.value)} maxLength={50}></input>
                <p>enter image url</p><input placeholder='image url'  value ={imageUrl} onChange={e=>setImageUrl(e.target.value)}></input>
            </Modal.Body>
            <Modal.Footer>
                {isEdit?<Button onClick={editProduct}>Save</Button>:<Button onClick={addNewProduct}>Submit</Button>}
                <Button onClick={()=>{setIsOpen(false)}}>Close</Button>
            </Modal.Footer>
        </Modal>
    </div>
    );
}
export default Admin;