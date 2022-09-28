import React, { Fragment, useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signupUser} from '../store/user';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import {userActions} from '../store/user'




const Signup = () => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  
      const { isFetching, isSuccess, isError, errorMessage } = useSelector(state => state.user);


  const onSubmit = (event) => {
    event.preventDefault()
    const name = nameInputRef.current.value
    const email = emailInputRef.current.value
    const password = passwordInputRef.current.value
    

    console.log(name,email,password)
    dispatch(signupUser({name,email,password}));
  };
  useEffect(() => {
    return () => {
      dispatch(userActions.clearState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(userActions.clearState());
    }
    if (isSuccess) {
      dispatch(userActions.clearState());
      history.push('/');
    }
  }, [dispatch, errorMessage, history, isError, isSuccess]);
  // useEffect(() => {
  //   if (userdetails.isSuccess) {
  //     dispatch(userActions.clearState());
  //     history.push('/');
  //   }
  //   if (userdetails.isError) {
  //     toast.error(userdetails.errorMessage);
  //     dispatch(userActions.clearState());
  //   }
  // }, []);
  return (
    <Fragment>
<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign Up for your account
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={onSubmit} >
          <label
                  for="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
          <input
            ref={emailInputRef}
            id="email"
            label="Your E-Mail"
            type="email"
            control="input"
          />
          <label
                  for="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
          <input
            ref={nameInputRef}
            id="name"
            label="Your Name"
            type="text"
            control="input"
          />
          <label
                  for="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
          <input
            ref={passwordInputRef}
            id="password"
            label="Password"
            type="password"
            control="input"
          />
          
          <button design="raised" type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
>
          {isFetching ? (
                    <svg
                      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : null}
            Signup
          </button>
        </form>
            <div class="mt-6">
              <div class="relative">
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">
                    Or <Link to="login"> Login</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Signup;

// const Signup = () => {
//   const dispatch = useDispatch();
//   const { register, errors, handleSubmit } = useForm();
//   const history = useHistory();

//   const { isFetching, isSuccess, isError, errorMessage } = useSelector(
//     userSelector
//   );
//   const onSubmit = (data) => {
//     dispatch(signupUser(data));
//   };

//   useEffect(() => {
//     return () => {
//       dispatch(clearState());
//     };
//   }, []);

//   useEffect(() => {
//     if (isSuccess) {
//       dispatch(clearState());
//       history.push('/');
//     }

//     if (isError) {
//       toast.error(errorMessage);
//       dispatch(clearState());
//     }
//   }, [isSuccess, isError]);

//   return (
//     <Fragment>
//       <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//         <div class="sm:mx-auto sm:w-full sm:max-w-md">
//           <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign Up to your account
//           </h2>
//         </div>
//         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//           <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//             <form
//               className="space-y-6"
//               onSubmit={handleSubmit(onSubmit)}
//               method="POST"
//             >
//               <div>
//                 <label
//                   for="name"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Name
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="name"
//                     name="name"
//                     type="text"
//                     ref={register({ required: true })}
//                     autocomplete="name"
//                     required
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>
//               </div>
//               <div>
//                 {/* <label
//                   for="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Email address
//                 </label> */}
//                 <div className="mt-1">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autocomplete="email"
//                     required
//                     ref={register({
//                       pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
//                     })}
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label
//                   for="password"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Password
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     ref={register({ required: true })}
//                     autocomplete="current-password"
//                     required
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   {isFetching ? (
//                     <Fragment>
//                       <svg
//                         class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           class="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           stroke-width="4"
//                         ></circle>
//                         <path
//                           class="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>

//                       <p>Signing up</p>
//                     </Fragment>
//                   ) : (
//                     <p> Sign up</p>
//                   )}
//                 </button>
//               </div>
//             </form>
//             <div class="mt-6">
//               <div class="relative">
//                 <div class="relative flex justify-center text-sm">
//                   <span class="px-2 bg-white text-gray-500">
//                     Or <Link to="login"> Login</Link>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default Signup;