import {Modal,Button} from 'react-bootstrap'; 
import logo from '../images/logo.jpg';
import React,{useState} from 'react';
import axios from 'axios';
import {getUserProducts} from './utils';
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
            case 'image':
                setImage(value);
                break;
        }
    }
    const addProduct = () =>{
        var uploaderEmail = 'admin';
        if(props.email!== undefined){
            uploaderEmail = props.email;
        }
        const newProduct = {
            title,
            price,
            description,
            catagory,
            image,
            uploader:uploaderEmail
        }
        console.log(catagory)
        if(title!==''&& price!==''&& description!==''&& catagory!==''&& image!==''){
            axios.post('https://igal-shopify-backend.herokuapp.com/product/addNew',{newProduct})
            .then(res=>{
                props.setShow(false);
                if(props.email!== undefined){
                    getUserProducts(props.email,props.updateProducts);
                }else{
                    axios.get('https://igal-shopify-backend.herokuapp.com/product/getAll').then(res=>{
                        props.updateProducts(res.data);
                    });
                }
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
            <input placeholder='Title' name = {'title'} onChange={updateInputs} maxlength="15"/>
            <input placeholder='Price' name = {'price'} onChange={updateInputs} type={'Number'}/>
            <input placeholder='Description' name = {'description'} onChange={updateInputs} maxlength="50"/>
            <select name="Catagory" onChange={(e)=>{setCatagory(e.target.value)}}>
                <option value="" disabled selected>Select your option</option>
                <option value="Cars" >Cars</option>
                <option value="Computer Parts" >Computer Parts</option>
                <option value="Furniture" >Furniture</option>
                <option value="Tech" >Tech</option>
                <option value="Miscellaneous" >Miscellaneous</option>
            </select>
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