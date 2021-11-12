import axios from 'axios';


//const url = 'https://recalling-memories-project.herokuapp.com/posts';
//const url = 'http://localhost:2000/posts';
const API = axios.create({ baseURL: 'https://recalling-memories-project.herokuapp.com' });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });


export  const fetchPosts= async ()=>
{
    const res =  await API.get('/posts');
    console.log(res.data);
    
    return res;
}
export const createPost=async (newPost)=>{
    try{console.log(newPost);
    await API.post('/posts',newPost);
    window.location.reload();}
    catch(e){
     // alert('Please attach .jpeg image only');
    }
}

export const updatePost = async(id,updatedPost)=>{
  try{
    await API.patch(`/posts/${id}`,updatedPost);
    window.location.reload();
  }
  catch(e){
    //alert('Please attach .jpeg image only');
  }
    
}
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
                 
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const signIn = (formData) =>{
  try{
    API.post('/user/signin', formData);
  }
  catch(e){
  alert('Please enter correct combination of email and password');
  }
} 
export const signUp = (formData) => API.post('/user/signup', formData);