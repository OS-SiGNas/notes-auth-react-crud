export interface Note {
  _id: string;
  title: string;
  description: string;
  folder?: string;
  content: string;
  createAt: string;
  authorId: string;
}

export interface NewNote {
  title?: string;
  description?: string;
  folder?: string;
  content?: string;
}
