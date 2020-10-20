export interface Comment {
  id?: string;
  postId: string;
  timestamp: Date;
  author: string;
  text: string;
}
