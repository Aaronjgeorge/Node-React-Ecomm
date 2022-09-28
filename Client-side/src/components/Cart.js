import { Link } from 'react-router-dom'
import { useSelector,useDispatch} from 'react-redux'
import { addToCart } from '../store/item';

export default function Cart(){
  
  const dispatch = useDispatch()
  let quantityChange = (e,productId,quantity)=>{
            window.location.reload(false);
            console.log(quantity)
            dispatch(addToCart({productId,quantity}))
        }           
const cartItems = useSelector((state)=>state.item.cart)
    return cartItems.data ? (<div class="container mx-auto mt-10">
    <div class="flex shadow-md my-10">
      <div class="w-3/4 bg-white px-10 py-10">
        <div class="flex justify-between border-b pb-8">
          <h1 class="font-semibold text-2xl">Shopping Cart</h1>
          <h2 class="font-semibold text-2xl">{(cartItems.data.items).length} {(cartItems.data.items).length>1?"Items":"Item"}</h2>
        </div>
        {cartItems.data.items.map(item=>{
            return(
            <>
            <div class="flex mt-10 mb-5">
              <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
              <h3 class="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
              <h3 class="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
              <h3 class="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
            </div>
            <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              <div class="flex w-2/5">
                <div class="w-20">
                  <img class="h-24" src={`http://localhost:8080\\`+ item.productId.imageUrl} alt={item.image}/>
                </div>
                <div class="flex flex-col justify-between ml-4 flex-grow">
                  <span class="font-bold text-sm">{item.productId.title}</span>
                  <span class="text-red-500 text-xs">{item.productId.description}</span>
                  <button class="font-semibold hover:text-red-500 text-gray-500 text-xs" onClick={e=>quantityChange(e,item.productId._id,0)}>Remove</button>
                </div>
              </div>
              <div class="flex justify-center w-1/5">
                <button onClick={e=>quantityChange(e,item.productId._id,-1)}>
                <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                </svg>

                </button>
    
                <input class="mx-2 border text-center w-8" type="text" value={item.quantity} />
                <button onClick={e=>quantityChange(e,item.productId._id,1)}>

                <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512" >
                  <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                </svg>
                </button>

              </div>
              <span class="text-center w-1/5 font-semibold text-sm">${item.productId.price}</span>
              <span class="text-center w-1/5 font-semibold text-sm">${item.productId.price*item.quantity}</span>
            </div>
            </>)})}
    </div>

        <div id="summary" class="w-1/4 px-8 py-10">
        <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        <div class="flex justify-between mt-10 mb-5">
          <span class="font-semibold text-sm uppercase">{(cartItems.data.items).length} {(cartItems.data.items).length>1?"Items":"Item"}</span>
          <span class="font-semibold text-sm">${cartItems.data.subTotal}</span>
        </div>
        <div>
          <label class="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
          <select class="block p-2 text-gray-600 w-full text-sm">
            <option>Standard shipping - $10.00</option>
          </select>
        </div>
        <div class="py-10">
          <label for="promo" class="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
          <input type="text" id="promo" placeholder="Enter your code" class="p-2 text-sm w-full"/>
        </div>
        <button class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
        <div class="border-t mt-8">
          <div class="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total cost</span>
            <span>${cartItems.data.subTotal + 10}</span>
          </div>
          <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
><Link to="/checkout">Proceed to Checkout</Link></button>
        </div>          
        </div>
      </div>
      </div>
      
      ):(<div><p>Something</p></div>)
    
    // (<Fragment>
    //     <div className="container">
    //     <div className="cart">
    //         <h5>You have ordered:</h5>
    //         <ul className="collection">
    //         {cartItems.data.items.map(item=>{
    //     return(
           
    //         <li className="collection-item avatar" key={item.productId._id}>
    //                     <div className="item-img"> 
    //                         <img src={`http://localhost:8080\\`+ item.productId.imageUrl} alt={item.image} className=""/>
    //                     </div>
                    
    //                     <div className="item-desc">
    //                         <span className="title">{item.productId.title}</span>
    //                         <p>{item.productId.description}</p>
    //                         <p><b>Price: {item.productId.price}$</b></p> 
    //                         <p>
    //                             <b>Quantity: {item.quantity}</b> 
    //                         </p>
    //                         <div className="add-remove">
    //                             <Link to="/cart"><i className="material-icons" onClick={e=>quantityChange(e,item.productId._id,1)}>arrow_drop_up</i></Link>
    //                             <Link to="/cart"><i className="material-icons" onClick={e=>quantityChange(e,item.productId._id,-1)}>arrow_drop_down</i></Link>
    //                         </div>
    //                         <button className="waves-effect waves-light btn pink remove" onClick={e=>quantityChange(e,item.productId._id,0)}>Remove</button>
    //                     </div>
                        
    //                </li>                        
    //     )
    // })}
    //         </ul>
    //     </div>  
    //     <button><Link to="/checkout">Cart</Link></button>
    // </div>
    // </Fragment>
    // ):<p>Loading..</p>;

}

