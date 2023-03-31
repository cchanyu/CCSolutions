import React, { useEffect, useState } from 'react'
import { Timestamp, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase.config'; 
import { useNavigate } from 'react-router-dom';
import "../css/Create.css";

const CreatePost = ({isAuth}) => {

  const [ title, setTitle ] = useState('');
  const [ code, setCode ] = useState('');
  const [ note, setNote ] = useState('');

  let navigate = useNavigate();

  // posts is the name of collection that'll be in the Firestore
  const postsCollectionRef = collection(db, 'posts'); 
  
  const createPost = async() => {
    if(title === '' || code === '' || note === ''){
      alert("Please fill out the form");
      return false;
    } else {
      try {
        await addDoc(postsCollectionRef, {
          title: title,
          code: code,
          note: note,
          author: {
            name: auth.currentUser.displayName,
            id: auth.currentUser.uid
          },
          creationDate: serverTimestamp(),
          lastModified: serverTimestamp()
        })
        navigate('/CCSolutions/home')
      } catch (error) {
        console.log(error);
      }
    }
  }

  // to secure, if user is not logged in, they can't come to /createpost
  useEffect(() => {
    if(!isAuth) {
      navigate("/CCSolutions/home");
    }
  })

  return (
    <div className='container'>
      <div className='bg-light p-5 rounded mt-3'>
        <h1>Create a Post</h1>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>Title</label>
          <input type="text" placeholder='Title' className='form-control' onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className='mb-3'>
          <label htmlFor='posts' className='form-label'>Code</label>
          <textarea placeholder='Type in the code here' className='form-control' onChange={(e) => setCode(e.target.value)}></textarea>
        </div>
        <div className='mb-3'>
          <label htmlFor='posts' className='form-label'>Note</label>
          <textarea placeholder='Type in the note here' className='form-control' onChange={(e) => setNote(e.target.value)}></textarea>
        </div>
        <button className='btn btn-dark' onClick={createPost}>Submit Post</button>
      </div>
    </div>
  )
}

export default CreatePost