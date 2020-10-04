import React, { FunctionComponent, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import PostStatusEnum from '../constants/PostStatusEnum';
import EditForm from './EditForm';
import DraftPostType from '../constants/DraftPostType';

interface IPostItemProps {
  _id: string;
  name: string;
  content: string;
  status: PostStatusEnum;
  user: {
    username: string;
  }
  category: {
    _id: number;
    name: string;
  }
  currentUsername?: string;
  onDelete: (_id: string) => Promise<void>;
  onEdit: (_id: string, draft: DraftPostType) => Promise<void>;
  isAuth: boolean;
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const PostItem: FunctionComponent<IPostItemProps> = (props) =>  {
  const classes = useStyles();
  const [editMode, setEditMode] = useState<boolean>(false);
  
  if (editMode && props.isAuth) {
    return (
      <Box padding={2} pb={0} height="100%">
        <EditForm
          initialValue={{
            ...props,
            categoryId: props.category._id,
          }}
          onCancel={() => setEditMode(false)} 
          onEdit={async (draft: DraftPostType) => {
            await props.onEdit(props._id, draft);
            setEditMode(false);
          }}
        />
      </Box>
    );
  }

  return (
    <Box padding={2} pb={0} height="100%">
      <Card className={classes.root}>
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Category: {props.category.name}
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Status: {props.status}
            </Typography>
          </Box>
          <Typography variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            by {props.user.username}
          </Typography>
          <Typography variant="body2" component="p">
            {props.content}
          </Typography>
        </CardContent>
        {
          props.user.username === props.currentUsername && (
            <CardActions>
              <Button size="small" onClick={() => setEditMode(true)}>EDIT</Button>
              <Button color="secondary" size="small" onClick={() => props.onDelete(props._id)}>DELETE</Button>
            </CardActions>
          )
        }
      </Card>
    </Box>
  );
};

export default PostItem;
