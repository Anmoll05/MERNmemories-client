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
    console.log(newPost);
    await API.post('/posts',newPost);
    window.location.reload();
}

export const updatePost = async(id,updatedPost)=>{
    await API.patch(`/posts/${id}`,updatedPost);
    window.location.reload();
}
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
                 
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);