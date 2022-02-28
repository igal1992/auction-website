const cartReducer = (state = [], action)=>{
    switch(action.type){
        case 'appendCart':
            state = [...state,action.payload];
            return state;
        case 'removeOneProduct':
                var tempArr = state.filter((product)=>{
                    return(product.title!==action.payload);
                })
                state = tempArr;
                return state;
        case 'removeAll':
                state = [];
                return state;
        default:
            return  state;
    }
}
export default cartReducer;