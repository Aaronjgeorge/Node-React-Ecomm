import { Fragment,useRef,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { updateProfile,getProfile } from '../store/user';

export default function Userprofile() {
        const imageInputRef = useRef();
        const nameInputRef = useRef();
        const emailInputRef = useRef();
        const passwordInputRef = useRef();

        const dispatch = useDispatch();
        useEffect(()=>{
        dispatch(getProfile())},[dispatch])

        const user = useSelector(state=>state.user.userInfo);
        const onSubmit = (event) => {
          // event.preventDefault()
          const image = imageInputRef.current.files[0]
          const email = emailInputRef.current.value
          const password = passwordInputRef.current.value
          const name = nameInputRef.current.value
          
          console.log(image)
          dispatch(updateProfile({name,email,password,image}));
        };
        return user[0]?(
          <Fragment>

{/* <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={`http://localhost:8080\\`+ user[0].userInfo.imageUrl}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute"
                        style={{ maxWidth: "200px" }}
                      />
                    </div>
                  </div> */}
  <div class="h-screen flex items-center justify-center bg-gray-200">
  
    <card class="w-1/3 bg-white border border-gray-100 rounded-lg text-center hover:shadow-lg align-center">
    

      
      <div class="flex justify-center">
        <img src={`http://localhost:8080\\`+ user[0].userInfo.imageUrl} class="rounded-full max-h-40 object-center border-4 border-white -mt-6 shadow-lg align-center" alt={`http://localhost:8080\\`+ user[0].userInfo.imageUrl}/>
      </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={e => onSubmit(e)} enctype="multipart/form-data" className="space-y-6">
          <div>
                <label
                  for="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
            <div className="mt-1">
          <input
            ref={emailInputRef}
            id="title"
            label="Your title"
            type="text"
            control="input"
            defaultValue={user[0].userInfo.email}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          </div>
          </div>
          <div>
                <label
                  for="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
          <input
            ref={nameInputRef}
            id="title"
            label="Your title"
            type="text"
            control="input"
            defaultValue={user[0].userInfo.name}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          </div>
          </div>
          <div>
                <label
                  for="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            ref={passwordInputRef}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            defaultValue={user[0].userInfo.password}
          />
            </div>
          </div>
          <div>
                <label
                  for="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image
                </label>
                <div className="mt-1">
          <input
            ref={imageInputRef}
            id="image"
            label="Your image"
            type="file"
            control="input"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          </div>
            </div>
          <button design="raised" type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Update
          </button>
          </form>
          </div>
          </div>
 
    
      </card>
      </div>
  
          </Fragment>
        ) : (<h1>Loading</h1>)
      }
