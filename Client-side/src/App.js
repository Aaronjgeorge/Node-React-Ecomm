import {useEffect} from 'react'
import { useSelector,useDispatch} from 'react-redux'
import { fetchItems } from './store/item';
import NavBar from './components/NavBar'
import {Fragment} from 'react'
import Cart from './components/Cart'
import { Route, Switch} from 'react-router-dom';
import Details from './components/Details';
import Login from './components/Login';
import Signup from './components/Signup';
import Addproduct from "./components/AddProduct"
import Products from "./components/Products"
import Checkout from "./components/Checkout"
import Userprofile from './components/UserProfile'
import NotFound from './components/404';
import { verifyUser } from './store/user';
import { getCart } from './store/item';
import "./styles/tailwind.css";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';






function App() {
  const dispatch = useDispatch()

useEffect(()=>{
  dispatch(fetchItems())
  dispatch(verifyUser())
  dispatch(getCart())
},[dispatch])
  
  const items = useSelector((state)=>state.item.items)
  const auth= localStorage.getItem("auth")
  
  function PrivateRoute({children, ...rest}){
      return(
      <Route {...rest} render={()=>{return auth === "true"? children : <Redirect to="/login" exact/>
    }} />)
  
  }


  return (
    <Fragment>
    <NavBar /> 
    <Switch>
      <Route path='/' exact>
      {items[0] && <Products />}
        </Route>
        <Route path="/info/:productId">
            <Details />
        </Route>
      <PrivateRoute path='/cart' exact>
            <Cart />
        </PrivateRoute>
        <PrivateRoute path='/user/profile' exact>
            <Userprofile />
        </PrivateRoute>
        <Route path="/login" exact>
            <Login />
        </Route>
        <Route path="/signup" exact>
            <Signup />
        </Route>
        <Route path="/add-product" exact>
            <Addproduct />
        </Route>
        <PrivateRoute path="/checkout" exact>
            <Checkout />
        </PrivateRoute>
        <Route path="*" component={NotFound} />
        </Switch>
    </Fragment>
  );
}

export default App;
