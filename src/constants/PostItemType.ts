import PostStatusEnum from './PostStatusEnum';

type PostItemType = {
  _id: string;
  name: string;
  status: PostStatusEnum;
  content: string;
  user: {
    _id: string;
    username: string;
  },
  category: {
    _id: number,
    name: string;
  }
};

export default PostItemType;
