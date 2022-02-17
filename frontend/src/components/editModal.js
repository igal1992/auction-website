import {Modal,Button} from 'react-bootstrap'; 
import logo from '../images/logo.jpg';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
function EditModal(props){
    const [title,setTitle] = useState('');
    const [price,setPrice] = useState('');
    const [description,setDescription] = useState('');
    const [catagory,setCatagory] = useState('');
    const [image,setImage] = useState('');
    useEffect(()=>{
        if(props.show){
            if(props.productToEdit.catagory !== undefined){
                setCatagory(props.productToEdit.catagory);
            }else{
                setCatagory("admin catagory");
            }
            setDescription(props.productToEdit.description);
            setImage(props.productToEdit.image);
            setTitle(props.productToEdit.title);
            setPrice(props.productToEdit.price);
        }
    },[props.show])
    const updateInputs =(e) =>{
        var value = e.target.value;
        var name = e.target.name;
        switch(name){
            case 'title':
                setTitle(value);
                break;
            case 'price':
                setPrice(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'catagory':
                setCatagory(value);
                break;
            case 'image':
                setImage(value);
                break;
        }
    }

    const saveProduct = () =>{
        const newProduct = {
            title,
            price,
            description,
            catagory,
            image,
            uploader:'admin',
            titleToEdit:props.productToEdit.title
        }
        console.log(newProduct)
        if(title!==''&& price!==''&& description!==''&& catagory!==''&& image!==''){
            axios.post('http://localhost:8080/product/edit',{newProduct})
            .then(res=>{
                props.setShow(false);
                axios.get('http://localhost:8080/product/getAll').then(res=>{
                    props.updateProducts(res.data);
                })
            }).catch(err=>{
                console.log('oops something went wrong!');
            })
        }   
    }
    return(
    <Modal show={props.show} size="md" centered  className='register-login-container' animation={false}>
        <Modal.Header>
          <Modal.Title className='register-login-header'>
            <img src={logo}/>
            <h1>Edit Product</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='register-login-body'>
            <input placeholder='Title' name = {'title'} onChange={updateInputs} value={title}/>
            <input placeholder='Price' name = {'price'} onChange={updateInputs} value={price}/>
            <input placeholder='Description' name = {'description'} onChange={updateInputs} value={description}/>
            <input placeholder='Catagory' name = {'catagory'} onChange={updateInputs} value={catagory}/>
            <input placeholder='Image' name = {'image'} onChange={updateInputs} value={image}/>
          </form>
        </Modal.Body>
        <Modal.Footer className='register-login-footer'>
          <Button variant="success" onClick={saveProduct}>Save</Button>
          <Button variant="danger" onClick={()=>{props.setShow(false)}}>Close</Button>
        </Modal.Footer>
      </Modal>
        );
}
export default EditModal;