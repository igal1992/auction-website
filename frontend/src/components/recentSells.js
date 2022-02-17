import {Button, ButtonGroup, Table} from 'react-bootstrap'
import React,{useState, useEffect} from 'react';
import axios from 'axios';
function RecentSells(){
    const [data,setData] = useState([]);
    var counter = 1;
    const getData= () =>{
        axios.get('http://localhost:8080/transactions/recentSells')
        .then(res=>{
            console.log(res.data)
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