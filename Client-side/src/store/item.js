import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

const initialCartState = { items: [],item:[], status:'',cart:[],total:0,ordered:''}; //initial cart

export const fetchItems = createAsyncThunk('items/fetch', async () => {
        const result= await fetch('http://localhost:8080/admin/get-products')
        const data = await result.json()
        return data
      }
  )

  export const fetchItem = createAsyncThunk('item/fetch', async (productId) => {
    const result= await fetch('http://localhost:8080/admin/get-product/'+productId,{
      headers:new Headers({
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      })
    })
    const data = await result.json()
    return data
  }
)

export const getCart = createAsyncThunk('items/getCart', async () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const result= await fetch('http://localhost:8080/admin/cart/'+userId,{
    headers:new Headers({
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    })
  })
  const data = await result.json()
  return data
}
)

export const addProduct = createAsyncThunk(
    "item/addProduct",
    async (dataa,{getState}) => {
      const state=getState();
        const {title,price,description,image} = dataa;
        const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('userId',state.user.id)
        const response = await fetch(
          "http://localhost:8080/admin/add-product",
          {
            method: "POST",
            headers: {
              Accept: "mulipart/form-data",
              // "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(state.user.token)}`
            },
            body: formData,
          }
        )
        let data = await response.json()
        return data;
    }
  )

  export const addToCart = createAsyncThunk(
    "item/addToCart",
    async (dataa,{getState}) => {
      const state=getState();
      const {productId,quantity} = dataa;
      const userId = JSON.parse(localStorage.getItem('userId'));
        const response = await fetch(
          "http://localhost:8080/admin/add-cart",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(state.user.token)}`
            },
            body:JSON.stringify({
              userId,
              productId,
              quantity
            }),
          }
        )
        let data = await response.json()
        if (response.status === 200) {
            return data;
        }
    }
  )

  export const placeOrder = createAsyncThunk(
    "item/placeOrder",
    async (dataa,{getState}) => {
      const state=getState();
      const {address1,address2,post,statename} = dataa;
      const products = state.item.cart.data.items; 
      const userId = JSON.parse(localStorage.getItem('userId'));

        const response = await fetch(
          "http://localhost:8080/admin/place-order",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(state.user.token)}`
            },
            body:JSON.stringify({
              address1,
              address2,
              post,
              statename,
              products,
              userId
            }),
          }
        )
        let data = await response.json()
        if (response.status === 200) {
            return data;
        }
    }
  )

const itemSlice = createSlice({ //cart slice
  name: 'counter',
  initialState: initialCartState,
  reducers: {
  
  },extraReducers: {
    [fetchItems.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchItems.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.items=[]
      state.items = state.items.concat(action.payload)
      
    },
    [fetchItems.rejected]: (state, action) => {
      state.status = 'failed'
    }
  ,
    [addProduct.pending]: (state, action) => {
      state.status = 'loading'
    },
    [addProduct.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.items = state.items.concat(action.payload)
      
    },
    [addProduct.rejected]: (state, action) => {
      state.status = 'failed'
    },
    [fetchItem.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchItem.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.item=[]
      state.item = state.item.concat(action.payload)
      
    },
    [fetchItem.rejected]: (state, action) => {
      state.status = 'failed'
    },
    [getCart.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getCart.fulfilled]: (state, action) => {
      state.cart = action.payload
      state.status = 'succeeded'
      
    },
    [getCart.rejected]: (state, action) => {
      state.status = 'failed'
    },
    [addToCart.pending]: (state, action) => {
      state.status = 'loading'
    },
    [addToCart.fulfilled]: (state, action) => {
      state.cart = action.payload
      state.status = 'succeeded'
      
    },
    [addToCart.rejected]: (state, action) => {
      state.status = 'failed'
    },
    [placeOrder.pending]: (state, action) => {
      state.status = 'loading'
    },
    [placeOrder.fulfilled]: (state, action) => {
      state.cart = action.payload
      state.ordered = 'success'
      
    },
    [placeOrder.rejected]: (state, action) => {
      state.status = 'failed'
    }
    
}});


export const itemActions = itemSlice.actions;

export default itemSlice.reducer;