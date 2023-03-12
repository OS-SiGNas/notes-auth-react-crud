import Request from '../shared/Request';

import type { ApiResponse } from './types';
import type { Note } from '../entities/NoteInterfaces';
import type { FetchState } from '../context/fetchContext';

interface NotesResponse extends ApiResponse {
  data: Note[];
}

interface NoteResponse extends ApiResponse {
  data: Note;
}

class NotesService {
  #req: Request;
  constructor() {
    this.#req = new Request();
  }

  public getNotes = async (
    token: string,
    setNotes: (arg: Note[]) => void,
    setFetching: (arg: FetchState) => void
  ): Promise<void> => {
    try {
      setFetching(true);
      const res = await this.#req.get<NotesResponse>('/notes', token);
      if (res.status !== 200) throw new Error(res.statusMsg);
      setNotes(res.data);
      setFetching(false);
    } catch (error) {
      console.error(error);
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
      if (res.status !== 200) throw new Error(res.statusMsg);
      setNote(res.data);
      setFetching(false);
    } catch (error) {
      console.error(error);
      setFetching('error');
    }
  };

  public createNote = async (
    token: string,
    body: Note,
    setNote: (arg: Note) => void,
    setFetching: (arg: FetchState) => void
  ): Promise<void> => {
    try {
      setFetching(true);
      const res = await this.#req.post<NoteResponse>('/notes', { token, body });
      if (res.status !== 200) throw new Error(res.statusMsg);
      setNote(res.data);
      setFetching(false);
    } catch (error) {
      console.error(error);
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
      if (res.status !== 200) throw new Error(res.statusMsg);
      setNote(res.data);
      setFetching(false);
    } catch (error) {
      console.error(error);
      setFetching('error');
    }
  };

  public deleteNote = async (
    noteId: string,
    token: string,
    setNote: (arg: Note) => void,
    setFetching: (arg: FetchState) => void
  ): Promise<void> => {
    try {
      setFetching(true);
      const res = await this.#req.get<NoteResponse>(`/notes/${noteId}`, token);
      if (res.status !== 200) throw new Error(res.statusMsg);
      setNote(res.data);
      setFetching(false);
    } catch (error) {
      console.error(error);
      setFetching('error');
    }
  };
} // end

export const { getNotes, getNote, createNote, updateNote, deleteNote } = new NotesService();
