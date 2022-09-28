import React, { Fragment,useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/item';

const Addproduct = () => {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const priceInputRef = useRef();
  const infoInputRef = useRef();
  const dispatch = useDispatch();
  const onSubmit = (event) => {
    event.preventDefault()
    const title = titleInputRef.current.value
    const price = priceInputRef.current.value
    const description = infoInputRef.current.value
    const image = imageInputRef.current.files[0]   
    console.log(title,price,description,image)
    dispatch(addProduct({title,price,description,image}));
  };

  return (
    <Fragment>
<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign Up to your account
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={e => onSubmit(e)} enctype="multipart/form-data">
          <input
            ref={titleInputRef}
            id="title"
            label="Your title"
            type="text"
            control="input"
          />
          <input
            ref={imageInputRef}
            id="image"
            label="Your image"
            type="file"
            control="input"
          />
          <input
            ref={priceInputRef}
            id="price"
            label="price"
            type="number"
            control="input"
          />
          <textarea
            ref={infoInputRef}
            id="info"
            label="info"
            type="text"
            control="input"
          />
          <button design="raised" type="submit">
            Signup
          </button>
        </form>
            <div class="mt-6">
              <div class="relative">
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">
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

export default Addproduct;