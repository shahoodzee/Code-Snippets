import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Grid } from '@mui/material';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts';

const Form = ({ handleClose }) => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    code: '',
    creator: '',
    tags: '',
    selectedFile: '',
  });

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    dispatch(createPost(postData));
    clear();
    handleClose();

  };

  const clear = () => {
    setPostData({
      title: '',
      description: '',
      code: '',
      creator: '',
      tags: '',
      selectedFile: '',
    });
  };

  return (
    <Paper style={{ padding: '20px', margin: '20px' }}>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          Create a Snippet.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              value={postData.title}
              onChange={(e) => setPostData({ ...postData, title: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="creator"
              variant="outlined"
              label="Creator"
              fullWidth
              value={postData.creator}
              onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              variant="outlined"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={postData.description}
              onChange={(e) => setPostData({ ...postData, description: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="Code"
              variant="outlined"
              label="code"
              fullWidth
              rows={4}
              value={postData.code}
              onChange={(e) => setPostData({ ...postData, code: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="tags"
              variant="outlined"
              label="Tags (comma separated)"
              fullWidth
              value={postData.tags}
              onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
            />
          </Grid>
          <Grid item xs={12}>
            {/* <div style={{ margin: '10px 0' }}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
              />
            </div> */}
            <div style={{ margin: '10px 0' }} >
              <FileBase 
                type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: '10px' }}>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" size="large" type="submit" fullWidth>
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="secondary" size="large" onClick={clear} fullWidth>
              Clear
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Form;
