import PostStatusEnum from './PostStatusEnum';

type DraftPostType = {
  name: string;
  status: PostStatusEnum;
  content: string;
  categoryId: number;
};

export default DraftPostType;
