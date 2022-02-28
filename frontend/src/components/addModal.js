import {Modal,Button} from 'react-bootstrap'; 
import logo from '../images/logo.jpg';
import React,{useState} from 'react';
import axios from 'axios';
function AddModal(props){
    const [title,setTitle] = useState('');
    const [price,setPrice] = useState('');
    const [description,setDescription] = useState('');
    const [catagory,setCatagory] = useState('');
    const [image,setImage] = useState('');

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
    const addProduct = () =>{
        const newProduct = {
            title,
            price,
            description,
            catagory,
            image,
            uploader:'admin'
        }
        if(title!==''&& price!==''&& description!==''&& catagory!==''&& image!==''){
            axios.post('http://localhost:8080/product/addNew',{newProduct})
            .then(res=>{
                props.setShow(false);
                axios.get('http://localhost:8080/product/getAll').then(res=>{
                    props.updateProducts(res.data);
                })
            }).catch(err=>{
                console.log(err);
            })
        }   
    }
    return(
    <Modal show={props.show} size="md" centered  className='pop-screen-container' animation={false}>
        <Modal.Header>
          <Modal.Title className='pop-screen-header'>
            <img src={logo}/>
            <h1>Add Product</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='pop-screen-body'>
            <input placeholder='Title' name = {'title'} onChange={updateInputs}/>
            <input placeholder='Price' name = {'price'} onChange={updateInputs}/>
            <input placeholder='Description' name = {'description'} onChange={updateInputs}/>
            <input placeholder='Catagory' name = {'catagory'} onChange={updateInputs}/>
            <input placeholder='Image' name = {'image'} onChange={updateInputs}/>
          </form>
        </Modal.Body>
        <Modal.Footer className='pop-screen-footer'>
          <Button variant="success" onClick={addProduct}>Add</Button>
          <Button variant="danger" onClick={()=>{props.setShow(false)}}>Close</Button>
        </Modal.Footer>
      </Modal>
        );
}
export default AddModal;