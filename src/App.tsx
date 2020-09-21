import React, { FunctionComponent, useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import cookies from 'js-cookie';
import { Grid } from '@material-ui/core';
import AppBar from './components/AppBar';
import PostItem from './components/PostItem';
import PostItemType from './constants/PostItemType';
import CreateForm from './components/CreateForm';
import DraftPostType from './constants/DraftPostType';

const App: FunctionComponent = () => {
  const accessToken = cookies.get('access-token');
  const currentUsername = cookies.get('username');

  axios.defaults.headers.common.Authorization = accessToken && `Bearer ${accessToken}`;

  const [isAuth, setIsAuth] = useState<boolean>(!!accessToken);
  const [postItems, setPostItems] = useState<PostItemType[]>([]);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

  async function fetchPostItem() {
    try {
      const response: { data:  PostItemType[] } = await axios.get(`${process.env.REACT_APP_ENDPOINT}/posts`);
      setPostItems(response.data);
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  useEffect(() => {
    fetchPostItem(); 
  }, []);

  async function login(username: string, password: string) {
    try {
      const response: { 
        data: { username: string, accessToken: string } 
      } = await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/auth/login`, 
        { username, password }
      );

      cookies.set('access-token', response.data.accessToken, { expires: 7 });
      cookies.set('username', response.data.username, { expires: 7 });
      setIsAuth(true);
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  async function register(username: string, password: string) {
    try {
      await axios.post(
        `${process.env.REACT_APP_ENDPOINT}/auth/register`, 
        { username, password }
      );

      alert('User created, you can try loging in.');
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  function logout() {
    cookies.remove('access-token');
    cookies.remove('username');
    setIsAuth(false);
    setShowCreateForm(false);
  }

  async function deletePost(_id: string) {
    try {
      await axios.delete(`${process.env.REACT_APP_ENDPOINT}/posts/${_id}`);
      fetchPostItem();
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  async function createPost(draftPost: DraftPostType) {
    try {
      await axios.post(`${process.env.REACT_APP_ENDPOINT}/posts`, draftPost);
      fetchPostItem();
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  async function editPost(_id: string, draftPost: DraftPostType) {
    try {
      await axios.put(`${process.env.REACT_APP_ENDPOINT}/posts/${_id}`, draftPost);
      fetchPostItem();
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  return (
    <div>
      <CssBaseline />
      <AppBar 
        isAuth={isAuth} 
        onLogin={login} 
        onLogout={logout} 
        onRegister={register}
        onCreate={() => setShowCreateForm(!showCreateForm)} 
        username={currentUsername}
      />

      {showCreateForm && <CreateForm onCreate={createPost} />}

      <Grid container>
        {
          postItems.map(post => {
            return (
              <Grid key={post._id} item xs={12} md={6} lg={4}>
                <PostItem 
                  {...post} 
                  isAuth={isAuth}
                  currentUsername={currentUsername} 
                  onDelete={deletePost} 
                  onEdit={editPost}  
                />
              </Grid>
            );
          })
        }
      </Grid>
    </div>
  );
};

export default App;
