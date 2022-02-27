import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {updateProducts} from '../../actions';
function AuctionHeader(props){
    const selectedClass = 'auction-filterBy-button-selected';
    const notSelectedClass = 'auction-filterBy-button';
    const [toSearch,setToSearch] = useState('');
    const [toggleAll,setToggleAll] = useState(selectedClass);
    const [toggleCars,setToggleCars] = useState(notSelectedClass);
    const [toggleComputerParts,setToggleComputerParts] = useState(notSelectedClass);
    const [toggleFurniture,setToggleFurniture] = useState(notSelectedClass);
    const [toggleMiscellaneous,setToggleMiscellaneous] = useState(notSelectedClass);
    const [toggleTech,setToggleTech] = useState(notSelectedClass);
    const [catagoryFilteredProducts,setCatagoryFilteredProducts] = useState([]);
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
            dispatch(updateProducts(temp));
            setCatagoryFilteredProducts(temp);
        }else{
          dispatch(updateProducts(props.original));
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
              <section id={'auction-filterBy'}>
                <button className={toggleAll} name={'all'} onClick={handleToggle}>All</button>
                <button className={toggleCars} name={'cars'} onClick={handleToggle}>Cars</button>
                <button className={toggleComputerParts} name={'computer parts'} onClick={handleToggle}>Computer Parts</button>
                <button className={toggleFurniture} name={'furniture'} onClick={handleToggle}>Furniture</button>
                <button className={toggleTech} name={'tech'} onClick={handleToggle}>Tech</button>
                <button className={toggleMiscellaneous} name={'miscellaneous'} onClick={handleToggle}>Miscellaneous</button>
              </section>
              <section id={'auction-search'}>
                <input id={'auction-search-input'} placeholder='Quick Search' onChange={(e)=>{setToSearch(e.target.value)}} value={toSearch} onKeyUp={filterBySearch}/>
                <button id = {'auction-search-button'} onClick={filterBySearch}>Search</button>
              </section>
            </div>
    )
}
export default AuctionHeader;