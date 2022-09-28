import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const getToken=()=>{
  const token1 = localStorage.getItem('token');
  return token1;

}

const initialUserState = {
  userInfo:[],
  loggedIn:false,
  id:"",
  email: "",
  token:"",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",};


export const verifyUser = createAsyncThunk(
  "user/verifyUser",
  async (dataa) => {
    let token1 = localStorage.getItem('token')
      const response = await fetch(
        "http://localhost:8080/auth/verify",
        {
          method: "POST",
          headers: {
            Accept: "mulipart/form-data",
            Authorization: `Bearer ${JSON.parse(token1)}`
            // "Content-Type": "application/json",
            // Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        }
      )
      let data = await response.json()
      if (response.status === 200) {
        return data;
      }
  }
)

export const signupUser = createAsyncThunk(
    "users/signupUser",
    async (dataa) => {
        const {name,email,password} = dataa;
        const response = await fetch(
          "http://localhost:8080/auth/signup",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
            }),
          }
        )
        let data = await response.json()
        if (response.status === 200) {
          localStorage.setItem("token", data.token)
          return { name: name, email: email }
        }
    }
  )

  export const loginUser = createAsyncThunk(
    "users/login",
    async (dataa,thunkAPI) => {
        const {email,password} = dataa;
        const response = await fetch(
          "http://localhost:8080/auth/login",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        )
        let data = await response.json()
        if (response.status === 200) {
          localStorage.setItem("token", JSON.stringify(data.token))
          localStorage.setItem("userId", JSON.stringify(data.userId))
          localStorage.setItem("email", JSON.stringify(data.email))
          localStorage.setItem("auth", true)

          console.log("Token Added")
          const remainingMilliseconds = 60;
          const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds)
          setTimeout(() => 
          function(){
          localStorage.removeItem('token')
          // localStorage.removeItem("userId")
          // localStorage.removeItem("email")
          // localStorage.removeItem("auth")
          } ,expiryDate);
          return data
        } else {
          return thunkAPI.rejectWithValue(data)
        }
      // } catch (e) {
      //   console.log("Error", e.response.data)
      //   thunkAPI.rejectWithValue(e.response.data)
      // }
    }
  )

  export const addComment = createAsyncThunk(
    "users/addComment",
    async (dataa) => {
        const {user,title, text,date,prodId} = dataa;
        const token1=getToken()
        const response = await fetch(
          "http://localhost:8080/admin/add-comment",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(token1)}`
            },
            body: JSON.stringify({
              user,
              title,
              text,
              date,
              prodId
            }),
          }
        )
        let data = await response.json()
        if (response.status === 200) {
          return data;
        }
    }
  )

  export const getProfile = createAsyncThunk('user/fetch', async () => {
    const user = localStorage.getItem('userId');
    const userId = JSON.parse(user)
    const result= await fetch('http://localhost:8080/admin/getProfile/'+ userId,{
      headers:new Headers({
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      })
    })
    const data = await result.json()
    return data
  }
)


  export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async (dataa) => {
        const {name,email,password,image} = dataa;
        const userId = JSON.parse(localStorage.getItem('userId'));
        const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', image);
    formData.append('userId',userId)

        const response = await fetch(
          "http://localhost:8080/auth/updateProfile",
          {
            method: "POST",
            headers: {
              Accept: "mulipart/form-data",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
            body: formData,
          }
        )
        let data = await response.json()
        if (response.status === 200) {
          return data;
        }
    }
  )

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
    logoutUser:(state)=>{
      localStorage.removeItem('token');
      localStorage.removeItem('expiryDate')
      localStorage.removeItem('userId')
      localStorage.removeItem('auth')

      state.loggedIn = false;
    }
},
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
          state.isFetching = false;
          state.isSuccess = true;
          return state;
        },
        [signupUser.rejected]: (state,action) => {
          state.isFetching = false;
          state.isError = true;
 
        },
        [signupUser.pending]: (state) => {
          state.isFetching = true;
        },
        [loginUser.fulfilled]: (state,action ) => {
            state.email = action.payload.email;
            state.id = action.payload.userId;
            state.token = localStorage.getItem('token')
            state.loggedIn = true;
            state.isFetching = false;
            state.isSuccess = true;
            return state;
          },
          [loginUser.rejected]: (state, action) => {
            state.isFetching = false;
            state.isError = true;
            // state.errorMessage = action.payload.message;
          },
          [loginUser.pending]: (state) => {
            state.isFetching = true;
          },
          [addComment.fulfilled]: (state,action ) => {
            // state.email = action.payload.email;
            // state.name = action.payload.name;
            state.loggedIn = true;
            state.isFetching = false;
            state.isSuccess = true;
            return state;
          },
          [addComment.rejected]: (state, action) => {
            state.isFetching = false;
            state.isError = true;
            // state.errorMessage = action.payload.message;
          },
          [addComment.pending]: (state) => {
            state.isFetching = true;
          },
          [getProfile.pending]: (state, action) => {
            state.status = 'loading'
          },
          [getProfile.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array
            state.userInfo=[]
            state.userInfo = state.userInfo.concat(action.payload)
            
          },
          [getProfile.rejected]: (state, action) => {
            state.status = 'failed'
          }
        ,[verifyUser.fulfilled]: (state, action) => {
          state.email = localStorage.getItem('email');
          state.id = localStorage.getItem('userId');
          state.token = localStorage.getItem('token');
          localStorage.setItem("auth",true);
          state.isFetching = false;
          state.isSuccess = true;
          state.loggedIn = true;
          return state;
        },
        [verifyUser.rejected]: (state,action) => {
          localStorage.setItem("auth",false);
          // localStorage.clear();
          state.isFetching = false;
          state.isError = true;
          state.loggedIn = false;
 
        },
        [verifyUser.pending]: (state) => {

        },
        [updateProfile.fulfilled]: (state, action) => {
          state.isFetching = false;
          state.isSuccess = true;

          return state;
        },
        [updateProfile.rejected]: (state,action) => {
          state.isFetching = false;
          state.isError = true;
 
        },
        [updateProfile.pending]: (state) => {
          state.isFetching = true;

        }
    }
}
    );

export const userActions = userSlice.actions;

export default userSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const signupUser = createAsyncThunk(
//   'users/signupUser',
//   async ({ name, email, password }, thunkAPI) => {
//     try {
//       const response = await fetch(
//         'http://localhost:8080/auth/signup',
//         {
//           method: 'POST',
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             name,
//             email,
//             password,
//           }),
//         }
//       );
//       let data = await response.json();
//       console.log('data', data);

//       if (response.status === 200) {
//         localStorage.setItem('token', data.token);
//         return { ...data, username: name, email: email };
//       } else {
//         return thunkAPI.rejectWithValue(data);
//       }
//     } catch (e) {
//       console.log('Error', e.response.data);
//       return thunkAPI.rejectWithValue(e.response.data);
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   'users/login',
//   async ({ email, password }, thunkAPI) => {
//     try {
//       const response = await fetch(
//         'https://mock-user-auth-server.herokuapp.com/api/v1/auth',
//         {
//           method: 'POST',
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             email,
//             password,
//           }),
//         }
//       );
//       let data = await response.json();
//       console.log('response', data);
//       if (response.status === 200) {
//         localStorage.setItem('token', data.token);
//         return data;
//       } else {
//         return thunkAPI.rejectWithValue(data);
//       }
//     } catch (e) {
//       console.log('Error', e.response.data);
//       thunkAPI.rejectWithValue(e.response.data);
//     }
//   }
// );

// export const fetchUserBytoken = createAsyncThunk(
//   'users/fetchUserByToken',
//   async ({ token }, thunkAPI) => {
//     try {
//       const response = await fetch(
//         'https://mock-user-auth-server.herokuapp.com/api/v1/users',
//         {
//           method: 'GET',
//           headers: {
//             Accept: 'application/json',
//             Authorization: token,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       let data = await response.json();
//       console.log('data', data, response.status);

//       if (response.status === 200) {
//         return { ...data };
//       } else {
//         return thunkAPI.rejectWithValue(data);
//       }
//     } catch (e) {
//       console.log('Error', e.response.data);
//       return thunkAPI.rejectWithValue(e.response.data);
//     }
//   }
// );

// export const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     username: '',
//     email: '',
//     isFetching: false,
//     isSuccess: false,
//     isError: false,
//     errorMessage: '',
//   },
//   reducers: {
//     clearState: (state) => {
//       state.isError = false;
//       state.isSuccess = false;
//       state.isFetching = false;

//       return state;
//     },
//   },
//   extraReducers: {
//     [signupUser.fulfilled]: (state, { payload }) => {
//       console.log('payload', payload);
//       state.isFetching = false;
//       state.isSuccess = true;
//       state.email = payload.user.email;
//       state.username = payload.user.name;
//     },
//     [signupUser.pending]: (state) => {
//       state.isFetching = true;
//     },
//     [signupUser.rejected]: (state, { payload }) => {
//       state.isFetching = false;
//       state.isError = true;
//       state.errorMessage = payload.message;
//     },
//     [loginUser.fulfilled]: (state, { payload }) => {
//       state.email = payload.email;
//       state.username = payload.name;
//       state.isFetching = false;
//       state.isSuccess = true;
//       return state;
//     },
//     [loginUser.rejected]: (state, { payload }) => {
//       console.log('payload', payload);
//       state.isFetching = false;
//       state.isError = true;
//       state.errorMessage = payload.message;
//     },
//     [loginUser.pending]: (state) => {
//       state.isFetching = true;
//     },
//     [fetchUserBytoken.pending]: (state) => {
//       state.isFetching = true;
//     },
//     [fetchUserBytoken.fulfilled]: (state, { payload }) => {
//       state.isFetching = false;
//       state.isSuccess = true;

//       state.email = payload.email;
//       state.username = payload.name;
//     },
//     [fetchUserBytoken.rejected]: (state) => {
//       console.log('fetchUserBytoken');
//       state.isFetching = false;
//       state.isError = true;
//     },
//   },
// });

// export const { clearState } = userSlice.actions;

// export const userSelector = (state) => state.user;