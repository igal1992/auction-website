import {Table} from 'react-bootstrap';
import React,{useState, useEffect} from 'react';
import { getRecentSells } from './utils';

function RecentSells(){

    const [data,setData] = useState([]);
    var counter = 1;
    useEffect(()=>{
        getRecentSells(setData);
    },[]);
    
return(
    <section>
         <div className='stats-title-container'>
                <h1 className='stats-title'>Recent sells in the past 50 days</h1>
            </div>
            <Table variant={"dark"} striped hover id='products-table'>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Buyer</th>
                    <th>Bought at</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                {data.map(transaction=>{
                        return(
                            <tr key={transaction._id.title}>
                                <td>{counter++}</td>
                                <td>{transaction.buyer?transaction.buyer:'Admin'}</td>
                                <td>{transaction.createdAt.slice(0,10)}</td>
                                <td>{transaction.price} $</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
    </section>
)
}
export default RecentSells;