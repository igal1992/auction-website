import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {updateProducts} from '../../actions';
import {BiArrowToTop,BiArrowToBottom} from 'react-icons/bi';
import {NavLink} from 'react-router-dom';
import logo from '../../images/logo.jpg';

function AuctionHeader(props){
    const selectedClass = 'auction-filterBy-button-selected';
    const notSelectedClass = 'auction-filterBy-button';
    const filterBySmall = 'auction-header-filterBy-small';
    const filteryByReguler = 'auction-header-filterBy';
    const [toSearch,setToSearch] = useState('');
    const [toggleAll,setToggleAll] = useState(selectedClass);
    const [toggleCars,setToggleCars] = useState(notSelectedClass);
    const [toggleComputerParts,setToggleComputerParts] = useState(notSelectedClass);
    const [toggleFurniture,setToggleFurniture] = useState(notSelectedClass);
    const [toggleMiscellaneous,setToggleMiscellaneous] = useState(notSelectedClass);
    const [toggleTech,setToggleTech] = useState(notSelectedClass);
    const [catagoryFilteredProducts,setCatagoryFilteredProducts] = useState([]);
    const [currentFilterBy,setCurrentFilterBy] = useState(filteryByReguler);
    const dispatch = useDispatch();
    const { state } = useLocation();

    useEffect(()=>{
      if(state !== null){
        setCatagoryFilteredProducts(state.original);
      }else if(props.original.length > 0){
        setCatagoryFilteredProducts(props.original);
      }
    },[props.original,state]);
    const filterBySearch = (e) =>{
        if(e.key == 'Enter' || e.key == undefined){
            dispatch(updateProducts(props.original));
            const temp = catagoryFilteredProducts.filter((product)=>  {
                return product.title.toLowerCase().includes(toSearch.toLowerCase());
            });
            dispatch(updateProducts(temp));
            setToSearch('');
        }
    }
    const filterByCatagory = (catagory) =>{
        setCatagoryFilteredProducts(props.original);
        props.setCurrentPage(1);
        if(catagory != 'all'){
            const temp = props.original.filter((product)=>  {
                    return product.catagory.toLowerCase() == catagory.toLowerCase();
                });
                if(temp.length<3 & window.innerWidth<=1024){
                  setCurrentFilterBy(filterBySmall);
                }else{
                  setCurrentFilterBy(filteryByReguler);
                }
            dispatch(updateProducts(temp));
            setCatagoryFilteredProducts(temp);
        }else{
          dispatch(updateProducts(props.original));
          setCurrentFilterBy(filteryByReguler);
        }
    }
    const handleToggle = (e) =>{
      let name = e.target.name;
      switch(name){
        case 'all':
          setToggleAll(selectedClass);
          setToggleCars(notSelectedClass);
          setToggleComputerParts(notSelectedClass);
          setToggleFurniture(notSelectedClass);
          setToggleMiscellaneous(notSelectedClass);
          setToggleTech(notSelectedClass);
          filterByCatagory('all');
          break;
        case 'cars':
          setToggleCars(selectedClass);
          setToggleAll(notSelectedClass);
          setToggleComputerParts(notSelectedClass);
          setToggleFurniture(notSelectedClass);
          setToggleMiscellaneous(notSelectedClass);
          setToggleTech(notSelectedClass);
          filterByCatagory('cars');

          break;
        case 'computer parts':
          setToggleComputerParts(selectedClass);
          setToggleAll(notSelectedClass);
          setToggleCars(notSelectedClass);
          setToggleFurniture(notSelectedClass);
          setToggleMiscellaneous(notSelectedClass);
          setToggleTech(notSelectedClass);
          filterByCatagory('computer parts');

          break;
        case 'furniture':
          setToggleFurniture(selectedClass);
          setToggleAll(notSelectedClass);
          setToggleCars(notSelectedClass);
          setToggleComputerParts(notSelectedClass);
          setToggleMiscellaneous(notSelectedClass);
          setToggleTech(notSelectedClass);
          filterByCatagory('furniture');

          break;
        case 'tech':
          setToggleTech(selectedClass)
          setToggleMiscellaneous(notSelectedClass);
          setToggleAll(notSelectedClass);
          setToggleCars(notSelectedClass);
          setToggleComputerParts(notSelectedClass);
          setToggleFurniture(notSelectedClass);
          filterByCatagory('tech');
          break;
        case 'miscellaneous':
            setToggleMiscellaneous(selectedClass);
            setToggleTech(notSelectedClass);
            setToggleAll(notSelectedClass);
            setToggleCars(notSelectedClass);
            setToggleComputerParts(notSelectedClass);
            setToggleFurniture(notSelectedClass);
            filterByCatagory('miscellaneous');
            break;
      }
    }
    return(
        <div id = {'auction-header'}>
              <section id={'auction-header-sortBy'}>
              <NavLink to ='/' id ="auction-header-logo-container"><img src={logo} id ="auction-header-logo"/></NavLink>
              <button id={'auction-header-sort-name'} onClick={()=>{props.sortByElement('title')}}>Product name {props.titleUp?<BiArrowToBottom/>:<BiArrowToTop/>}</button>
                <button id={'auction-header-sort-price'} onClick={()=>{props.sortByElement('price')}}>Product price {props.priceUp?<BiArrowToBottom/>:<BiArrowToTop/>}</button>
              </section>
              <section id={currentFilterBy}>
                <h1 style={{textAlign:'center',borderBottom:'black dotted 2px',paddingBottom:'25px',margin:'0'}}>Filter By</h1>
                <div><button className={toggleAll} name={'all'} onClick={handleToggle}>All</button></div>
                <div><button className={toggleCars} name={'cars'} onClick={handleToggle}>Cars</button></div>
                <div><button className={toggleComputerParts} name={'computer parts'} onClick={handleToggle}>Computer Parts</button></div>
                <div><button className={toggleFurniture} name={'furniture'} onClick={handleToggle}>Furniture</button></div>
                <div><button className={toggleTech} name={'tech'} onClick={handleToggle}>Tech</button></div>
                <div><button className={toggleMiscellaneous} name={'miscellaneous'} onClick={handleToggle}>Miscellaneous</button></div>
              </section>
              <section id={'auction-search'}>
                <input id={'auction-search-input'} placeholder='Quick Search' onChange={(e)=>{setToSearch(e.target.value)}} value={toSearch} onKeyUp={filterBySearch}/>
                <button id = {'auction-search-button'} onClick={filterBySearch}>Search</button>
              </section>
            </div>
    )
}
export default AuctionHeader;