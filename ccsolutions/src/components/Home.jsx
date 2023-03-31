import React, { useEffect, useState } from 'react'
import { updateDoc, getDocs, collection, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase.config';
import "../css/Home.css";

const Home = ({ isAuth }) => {
  
  const [ postLists, setPostList ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const postsCollectionRef = collection(db, 'posts');

  const [ isEdit, setIsEdit ] = useState(0);
  const [ title, setTitle ] = useState('');
  const [ code, setCode ] = useState('');
  const [ note, setNote ] = useState('');

  const getPosts = async() => {
    setLoading(false);
    const data = await getDocs(postsCollectionRef);
    setPostList(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
    setLoading(false);
  }

  const deletePost = async(id) => {
    const postDocRef = doc(db, 'posts', id);
    await deleteDoc(postDocRef);

    // this reloads the page after deleting the post
    getPosts();
  }

  const editPost = async(post) => {
    setTitle(post.title);
    setCode(post.code);
    setNote(post.note);
    setIsEdit(post.id);
  }

  const submitEdit = async(post) => {
    const editDocRef = doc(db, 'posts', post.id);
    if(title === '' || code === '' || note === ''){
      alert("Please fill the form");
      return false;
    } else {
      const updateData = {
        title: title,
        code: code,
        note: note,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid
        },
        lastModified: serverTimestamp()
      };
      updateDoc(editDocRef, updateData)
      .then(editDocRef => {
          setIsEdit(0);
          getPosts();
          console.log("Document Updated.");
      })
      .catch(error => {
          console.log(error);
      })
    }
  }

  useEffect(() => {
    getPosts();
  },[])

  if(loading) {
    return (<h3>Loading...</h3>)
  }

  return (
    <div className='homepage'>
      {postLists.length === 0 ? <h3>No post was found</h3> : postLists.map((post) => {
        return (
          <div key={post.id} className='card mb-4 shadow shadow-sm'>
            <div className="card-body">
              {isAuth && post.author.id === auth.currentUser.uid && 
              <div className='d-flex justify-content-end'>
                <button className='btn btn-warning my-3 mx-1' onClick={() => { editPost(post) }}>Edit</button>
                <button className='btn btn-danger my-3 mx-1' onClick={() => { deletePost(post.id) }}>Delete</button>
              </div>}
              {isEdit === post.id && post.author.id === auth.currentUser.uid ?
                (<div className='container'>
                  <div className='bg-light p-5 rounded mt-3'>
                    <h1>Edit This Post</h1>
                    <div className='mb-3 text-start'>
                      <label htmlFor='title' className='form-label'>Title</label>
                      <input type="text" placeholder='Title' value={title} className='form-control' onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='mb-3 text-start'>
                      <label htmlFor='posts' className='form-label'>Code</label>
                      <textarea placeholder='Type in the code here' value={code} className='form-control' onChange={(e) => setCode(e.target.value)}></textarea>
                    </div>
                    <div className='mb-3 text-start'>
                      <label htmlFor='posts' className='form-label'>Note</label>
                      <textarea placeholder='Type in the note here' value={note} className='form-control' onChange={(e) => setNote(e.target.value)}></textarea>
                    </div>
                    <button className='btn btn-dark' onClick={() => { submitEdit(post) }}>Submit</button>
                    <button className='btn mx-2' onClick={() => { setIsEdit(0) }}>Cancel</button>
                  </div>
                </div>) : 
                (<div className='container'>
                  <h5 className='card-title mb-3 fw-bold text-start'>{post.title}</h5>
                  <hr />
                  <pre className='card-title mb-3 text-start'>{post.code}</pre>
                  <hr />
                  <p className='card-title mb-3 text-start'>{post.note}</p>
                  <div className='d-flex flex-row-reverse'>
                    <p className='p-2 text-end badge bg-dark'>Created by {post.author.name}</p>
                    <p className='p-2 badge bg-light text-black mx-3'>{new Date(post.lastModified?.toDate()).toLocaleString()}</p>
                  </div>
                </div>)}
            </div>
          </div>
        )})}
    </div>
  )
}

export default Home