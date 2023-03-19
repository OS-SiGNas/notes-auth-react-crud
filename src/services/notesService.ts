import requests from './Fetch';
// Types
import type { Fetch } from './Fetch';
import type { Note, NewNote } from '../entities/NoteInterfaces';
import type { FetchState } from '../context/fetchContext';
import type { ApiResponse } from './types';
interface NotesResponse extends ApiResponse {
  data: Note[];
}
interface NoteResponse extends ApiResponse {
  data: Note;
}

class NotesService {
  #req: Fetch;
  constructor(requests: Fetch) {
    this.#req = requests;
  }

  public getNotes = async (
    token: string,
    setNotes: (arg: Note[]) => void,
    setFetching: (arg: FetchState) => void
  ): Promise<void> => {
    try {
      setFetching(true);
      const res = await this.#req.get<NotesResponse>('/notes', token);
      if (res.status === 200) {
        setNotes(res.data);
        setFetching(false);
      } else throw new Error(res.statusMsg);
    } catch (error) {
      console.info(error);
      setFetching('error');
    }
  };

  public getNote = async (
    noteId: string,
    token: string,
    setNote: (arg: Note) => void,
    setFetching: (arg: FetchState) => void
  ): Promise<void> => {
    try {
      setFetching(true);
      const res = await this.#req.get<NoteResponse>(`/notes/${noteId}`, token);
      if (res.status === 200) {
        setNote(res.data);
        setFetching(false);
      } else throw new Error(res.statusMsg);
    } catch (error) {
      console.info(error);
      setFetching('error');
    }
  };

  public createNote = async (
    token: string,
    body: NewNote,
    setFetching: (arg: FetchState) => void,
    notes: Note[],
    setNotes: (arg: Note[]) => void
  ): Promise<void> => {
    try {
      setFetching(true);
      const res = await this.#req.post<NoteResponse>('/notes', { token, body });
      if (res.status === 201) {
        setFetching(false);
        setNotes([...notes, res.data]);
      } else throw new Error(res.statusMsg);
    } catch (error) {
      console.info(error);
      setFetching('error');
    }
  };

  public updateNote = async (
    token: string,
    body: Note,
    setNote: (arg: Note) => void,
    setFetching: (arg: FetchState) => void
  ): Promise<void> => {
    try {
      setFetching(true);
      const res = await this.#req.put<NoteResponse>('/notes', { token, body });
      if (res.status === 200) {
        setNote(res.data);
        setFetching(false);
      } else throw new Error(res.statusMsg);
    } catch (error) {
      console.info(error);
      setFetching('error');
    }
  };

  public deleteNote = async (
    noteId: string,
    token: string,
    notes: Note[],
    setNotes: (arg: Note[]) => void,
    setFetching: (arg: FetchState) => void
  ): Promise<void> => {
    try {
      setFetching(true);
      const res = await this.#req.del<NoteResponse>(`/notes/${noteId}`, token);
      if (res.status === 200) {
        setFetching(false);
        setNotes(notes.filter((note) => note._id !== noteId));
      } else throw new Error(res.statusMsg);
    } catch (error) {
      console.info(error);
      setFetching('error');
    }
  };
} // end

export const { getNotes, getNote, createNote, updateNote, deleteNote } = new NotesService(requests);
