import {Button, ButtonGroup, Table} from 'react-bootstrap'
import React,{useState, useEffect} from 'react';
import axios from 'axios';
function TopFiveSells(){
    const [data,setData] = useState([]);
    var counter = 1;
    const getData= () =>{
        axios.get('http://localhost:8080/transactions/topSells')
        .then(res=>{
            setData(res.data);
        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getData();
    },[])
return(
    <section>
         <div className='stats-title-container'>
                <h1 className='stats-title'>Top 5 Sells</h1>
            </div>
            <Table variant={"dark"} striped hover id='products-table'>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Count</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(transaction=>{
                        return(
                            <tr key={transaction._id.title}>
                                <td>{counter++}</td>
                                <td>{transaction._id.title}</td>
                                <td>{transaction.count}</td>
                                <td>{transaction._id.price} $</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
    </section>
)
}
export default TopFiveSells;