import Item1 from '../../images/1.jpg'
import Item2 from '../../images/2.jpg'
import Item3 from '../../images/3.jpg'
import Item4 from '../../images/4.jpg'

import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING ,GET_UPDATED_ITEMS} from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {id:1,title:'Electronic Piano', desc: " Keyboard 61 Keys- Multi-Function Portable Piano Keyboard .", price:1100,img:Item1},
        {id:2,title:'Echo Show ', desc: " Smart display with Alexa - 8 HD screen with stereo sound – Black", price:8000,img: Item2},
        {id:3,title:'Samsung', desc: "WireLess Headphones with best quality ,Portable and Volume Control",price:12000,img: Item3},
        {id:4,title:'White', desc: "Multimedia Speaker with Aux Connectivity,USB Powered and Volume Control.", price:2600,img:Item4},
    ],
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          console.log('addedItem===========',addedItem)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         console.log('existed_item===========',existed_item)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price ,
                  inCart:existed_item.quantity>=1?true:false,
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal,
                inCart:true,
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 50
          }
    }
    if(action.type === GET_UPDATED_ITEMS){
        console.log('yesssssssss',action)
        return{
            ...state,
        }
  }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 50
        }
  }
  
    
  else{
    return state
    }
    
}

export default cartReducer
