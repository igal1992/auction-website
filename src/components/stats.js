import React, { useState, useEffect } from 'react';
function Stats(){
    const [topSells, setTopSells] = useState([]);//list of top 5 sells
    const [uniqueSells, setUniqueSells] = useState([]);//list of top 5 uinique sells
    const [recentSells, setRecentSells] = useState([]);//list of recent sells in the last 5 days
    const [isLoaded, setIsLoaded] = useState(false);//a boolean value to determined if to run useEffect
    const [error, setError] = useState(null);//an error value if fetching failed
    const getData = ()=>{
        fetch("https://whistbackend.herokuapp.com/transactions/recentSells")
        .then(res => res.json())
        .then((result)=>{
            setIsLoaded(true);
            setRecentSells(result);
        },
        (error)=>{
            setIsLoaded(true);
            setError(error); 
            }
        )
        fetch("https://whistbackend.herokuapp.com/transactions/topSells")
        .then(res => res.json())
        .then((result)=>{
            setIsLoaded(true);
            setTopSells(result);
        },
        (error)=>{
            setIsLoaded(true);
            setError(error); 
            }
        )
        fetch("https://whistbackend.herokuapp.com/transactions/uniqueSells")
        .then(res => res.json())
        .then((result)=>{
            setIsLoaded(true);
            setUniqueSells(result);
        },
        (error)=>{
            setIsLoaded(true);
            setError(error); 
            }
        )
    }
    useEffect(() => {
        getData();
    },[isLoaded])
    return(
        <div>
        <section id = "container">
            <h1 id = "title">Stats</h1>
            <section id="statsContainer">
                <div className="statsContainers">
                    <h4>Top 5 Sells</h4>
                    <div className="statsContentBox">
                    {topSells.map((list)=>{
                            return(
                                <div className='statsLists'>
                                    <span className='statsListsStart'>{list._id.title}</span>
                                    <span className='statsListsMid'>count: {list.count}</span>
                                    <span className='statsListsEnd'>price: {list._id.price}$</span>
                                </div>
                            )
                        })}
                    </div>  
                </div>
                <div className="statsContainers">
                    <h4>Top 5 Unique Sell</h4>
                    <div className="statsContentBox">
                    {uniqueSells.map((list)=>{
                            return(
                                <div className='statsLists'>
                                    <span className='statsListsStart'>{list._id.title}</span>
                                    <span className='statsListsMid'>uniques: {list.count}</span>
                                    <span className='statsListsEnd'>price: {list._id.price}$</span>
                                </div>
                            )
                        })}
                    </div>  
                </div>
                <div className="statsContainers">
                    <h4>Past 5 Days</h4>
                    <div className="statsContentBox">
                        {recentSells.map((list)=>{
                            return(
                                <div className='statsLists'>
                                    <span className='statsListsStart'>{(list.createdAt).slice(0,10)}</span>
                                    <span className='statsListsEnd'>price: {list.price}$</span>
                                </div>
                            )
                        })}
                    </div>  
                </div>
            </section>
        </section>
    </div>
    );
}
export default Stats;