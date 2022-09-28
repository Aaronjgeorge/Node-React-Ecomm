import {Fragment,useEffect,useRef} from 'react'
import { useSelector,useDispatch} from 'react-redux'
import { placeOrder } from '../store/item';
import { useHistory } from 'react-router-dom';



export default function Checkout(){
    const history = useHistory();
    const address1InputRef = useRef();
    const address2InputRef = useRef();
    const postInputRef = useRef();
    const stateInputRef = useRef();

    const dispatch = useDispatch()
    const orderstatus = useSelector(
        (state)=>state.item.ordered);
        // const auth= useSelector((state)=>state.user.loggedIn)
        
        // if(!auth){
        //   history.push('/')
        // }   

    const onSubmit = (event) => {
        event.preventDefault()
        const address1 = address1InputRef.current.value
        const address2 = address2InputRef.current.value
        const post = postInputRef.current.value
        const statename = stateInputRef.current.value
        dispatch(placeOrder({address1,address2,post,statename}));
}

useEffect(()=>{
    if(orderstatus === "success"){
        history.push('/');

    }
})


    return(<Fragment>
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Please Enter Your Shipping Details
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={onSubmit} >
          <label
                  for="Address1"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address Line 1
                </label>
                <div className="mt-1">
          <input
            ref={address1InputRef}
            id="Address1"
            label="Your address"
            type="address1"
            control="input"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          </div>
          <label
                  for="Address2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address Line 2
                </label>
                <div className="mt-1">
          <input
            ref={address2InputRef}
            id="Address2"
            label="Your address"
            type="address2"
            control="input"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

          />
          </div>
          <label
                  for="post"
                  className="block text-sm font-medium text-gray-700"
                >
                  PostCode
                </label>
                <div className="mt-1">
          <input
            ref={postInputRef}
            id="post"
            label="postcode"
            type="post"
            control="input"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

          />
          </div>
          <label
                  for="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <div className="mt-1">
          <input
            ref={stateInputRef}
            id="state"
            label="Password"
            type="state"
            control="input"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          </div>
   
          <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
           design="raised" type="submit">Place order</button>
          </form>
          </div>
          </div>
          </div>
    </Fragment>)


}