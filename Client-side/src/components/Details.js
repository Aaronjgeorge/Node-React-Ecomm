import {useEffect,useRef} from 'react'
import { useSelector,useDispatch} from 'react-redux'
import { fetchItem} from '../store/item';
import {useParams} from "react-router-dom"
import React from 'react';
import { Fragment } from 'react';
import { addComment } from '../store/user';
import { addToCart } from '../store/item';

export default function Details() {

  function checkTime(x,y){
  
  if(Math.round((((x - y)/(60*1000))/60)) >= 24){
    const hour = Math.round(((((x - y)/(60*1000))/60))/24)
    const posted = `${hour} Days Ago`
    return posted
  }if(Math.round(((x - y)/(60*1000))) >= 60){
      const min = Math.round((((x - y)/(60*1000))/60))
      const posted = `${min} Hours Ago`
      return posted
    } else{
      const sec = Math.round(((x - y)/(60*1000)))
      const posted = `${sec} Minutes Ago`
      return posted
    }
  }
  
  const titleInputRef = useRef();
  const commentInputRef = useRef();
  const params = useParams()
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchItem(params.productId))},[dispatch,params.productId])
  console.log(params.productId)
  
  
  let quantityChange = (e,productId,quantity)=>{
    window.location.reload(false);
    console.log(quantity)
    dispatch(addToCart({productId,quantity}))
}
  const iteminfo = useSelector(state=>state.item.item)
  
  const email = JSON.parse(localStorage.getItem("userId"));
  console.log(email)
  
  const onSubmit = (e) =>{
    const user = email;
    const title = titleInputRef.current.value;
    const text = commentInputRef.current.value;
    const d = new Date();
    const date = d.getTime();
    console.log(date)
    const prodId = iteminfo[0].Productinfo._id;
    dispatch(addComment({user,title,text,date,prodId}));
  }
    return iteminfo[0] ?  
    
  ( <Fragment>

<section class="text-gray-400 bg-gray-900 body-font overflow-hidden">
  <div class="container px-5 py-24 mx-auto">
    <div class="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={`http://localhost:8080/`+ iteminfo[0].Productinfo.imageUrl.replace("‡","/")} />
      <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 class="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
        <h1 class="text-white text-3xl title-font font-medium mb-1">{iteminfo[0].Productinfo.title}</h1>
        <div class="flex mb-4">
          <span class="flex items-center">
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span class="ml-3">4 Reviews</span>
          </span>
          <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-800 text-gray-500 space-x-2">
            <a href="www.facebook.com">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a href="www.twitter.com">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a href="www.web.whatsapp.com">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
            </a>
          </span>
        </div>
        <p class="leading-relaxed">{iteminfo[0].Productinfo.description}</p>
        {/* <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5">
          <div class="flex">
            <span class="mr-3">Color</span>
            <button class="border-2 border-gray-800 rounded-full w-6 h-6 focus:outline-none"></button>
            <button class="border-2 border-gray-800 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
            <button class="border-2 border-gray-800 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
          </div>
          <div class="flex ml-6 items-center">
            <span class="mr-3">Size</span>
            <div class="relative">
              <select class="rounded border border-gray-700 focus:ring-2 focus:ring-indigo-900 bg-transparent appearance-none py-2 focus:outline-none focus:border-indigo-500 text-white pl-3 pr-10">
                <option>SM</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
              <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>
        </div> */}
        <div class="flex">
          <span class="title-font font-medium text-2xl text-white">${iteminfo[0].Productinfo.price}</span>
          {/* <button class="rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button> */}
        </div>
      </div>
          <button class="flex ml-auto justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={e=>quantityChange(e,iteminfo[0].Productinfo._id,1)}>Add To Cart</button>
    </div>
  </div>
</section>

<div class="flex w-full mx-auto items-center justify-center shadow-lg mt-5">
   <form class="w-full max-w-xl bg-white rounded-lg px-4 pt-2" onSubmit={onSubmit}>
      <div class="flex flex-wrap -mx-3 mb-6">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add a new Comment
          </h2>
         <div class="w-full md:w-full px-3 mb-2 mt-2">
            <input         ref={titleInputRef}
        id="title"
        label="Your title"
        type="text"
        control="input" class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Title' required></input>
         </div>
         <div class="w-full md:w-full px-3 mb-2 mt-2">
            <textarea ref={commentInputRef}
        id="info"
        label="info"
        type="text"
        control="input" class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Type Your Comment' required></textarea>
         </div>
         <div class="w-full flex items-start md:w-full px-3">
            <div class="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
               <svg fill="none" class="w-5 h-5 text-gray-600 mr-1" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
               </svg>
               <p class="text-xs md:text-sm pt-px">Please do not type offensive content.</p>
            </div>
            <div class="-mr-1">
               <input type='submit' className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
 value='Post Comment' />
            </div>
         </div>
         </div>
      </form>
   </div>
<div>
<section class="text-gray-400 bg-gray-900 body-font">
<div class="container px-5 py-20 mx-auto">
  <h1 class="text-3xl font-medium title-font text-white mb-12 text-center">Comments</h1>
  <div class="flex flex-wrap -m-4">
  {iteminfo[0].Productinfo.comment.map(comments=>{
  return (
    <div class="p-4 md:w-1/3 w-full">
      <div class="h-full bg-gray-800 bg-opacity-40 p-8 rounded">
      <h2 class="mt-6 text-3xl font-extrabold text-white">
      {comments.title}
          </h2>
        <p class="leading-relaxed mb-6">{comments.text}</p>
        <p class="inline-flex items-center">
          <img alt="testimonial" src={`http://localhost:8080\\`+ comments.user[0].imageUrl} class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
          <span class="flex-grow flex flex-col pl-4">
            <span class="title-font font-medium text-white">{comments.user[0].email}</span>
            <span class="text-white-800 text-sm">{checkTime(iteminfo[0].time,comments.date)}
</span>
          </span>
        </p>
      </div>
    </div>)})}
    </div>
    </div>
    </section>
</div>
</Fragment>
): <p>Loading...</p>;   
}

