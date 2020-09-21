import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { FunctionComponent, useEffect, useState } from 'react';
import DraftPostType from '../constants/DraftPostType';
import PostStatusEnum from '../constants/PostStatusEnum';

type Category = { _id: number, name: string };

interface IEditFormProps {
  onEdit: (draft: DraftPostType) => Promise<void>;
  onCancel: () => void;
  initialValue: DraftPostType;
}

const EditForm: FunctionComponent<IEditFormProps> = (props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState<string>(props.initialValue.name);
  const [content, setContent] = useState<string>(props.initialValue.content);
  const [status, setStatus] = useState<PostStatusEnum>(
    props.initialValue.status
  );
  const [categoryId, setCategoryId] = useState<number>(
    props.initialValue.categoryId
  );

  async function fetchCategories() {
    try {
      const response: { data: Category[] } = await axios.get(`${process.env.REACT_APP_ENDPOINT}/categories`);
      setCategories(response.data);
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  useEffect(() => {
    fetchCategories(); 
  }, []);

  function getDraftPost(): DraftPostType {
    return {
      name,
      content, 
      status,
      categoryId,
    };
  }

  return (
    <Box component={Paper} margin={2} padding={2}>
      <TextField label="Name" value={name} onChange={e => setName(e.target.value)} />
      <br />
      <TextField label="Content" multiline fullWidth value={content} onChange={e => setContent(e.target.value)} />
      <br />
      <br />
      <FormControl>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select value={status} style={{ width: '150px' }} onChange={e => setStatus(e.target.value as PostStatusEnum)}>
          <MenuItem value={PostStatusEnum.A}>{PostStatusEnum.A}</MenuItem>
          <MenuItem value={PostStatusEnum.B}>{PostStatusEnum.B}</MenuItem>
          <MenuItem value={PostStatusEnum.C}>{PostStatusEnum.C}</MenuItem>
        </Select>
      </FormControl>
      <br />
      <FormControl>
        <InputLabel id="demo-simple-select-label">Categories</InputLabel>
        <Select style={{ width: '150px' }} value={categoryId} onChange={e => setCategoryId(e.target.value as number)}>
          {
            categories.map(category => (
              <MenuItem 
                key={category._id}
                value={category._id}
              >{category.name}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <Box display="flex" justifyContent="flex-end">
        <Button color="primary" disabled={!categoryId || !name || !content} onClick={() => props.onEdit(getDraftPost())}>Edit</Button>
        <Button color="secondary" onClick={props.onCancel}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default EditForm;
