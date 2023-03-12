export interface Note {
  _id: string;
  title: string;
  description: string;
  content: string;
  createAt: Date;
  authorId: string;
}
