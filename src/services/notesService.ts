import req from './Fetch';
// Types
import type { Note, NewNote } from '../entities/NoteInterfaces';
import type { IsLoadingState } from '../context/isLoadingContext';
import type { ApiResponse } from './types';
interface NotesResponse extends ApiResponse {
  data: Note[];
}
interface NoteResponse extends ApiResponse {
  data: Note;
}

class NotesService {
  public getNotes = async (
    setNotes: (arg: Note[]) => void,
    setIsLoading: (arg: IsLoadingState) => void
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const res = await req.get<NotesResponse>('/notes');
      if (res.status === 200) {
        setNotes(res.data);
        setIsLoading(false);
      } else throw new Error(res.message);
    } catch (error) {
      console.info(error);
      setIsLoading('error');
    }
  };

  public getNote = async (
    noteId: string,
    setNote: (arg: Note) => void,
    setIsLoading: (arg: IsLoadingState) => void
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const res = await req.get<NoteResponse>(`/notes/${noteId}`);
      if (res.status === 200) {
        setNote(res.data);
        setIsLoading(false);
      } else throw new Error(res.message);
    } catch (error) {
      console.info(error);
      setIsLoading('error');
    }
  };

  public createNote = async (
    body: NewNote,
    setIsLoading: (arg: IsLoadingState) => void,
    notes: Note[],
    setNotes: (arg: Note[]) => void
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const res = await req.post<NoteResponse>('/notes', body);
      if (res.status === 201) {
        setIsLoading(false);
        setNotes([...notes, res.data]);
      } else throw new Error(res.message);
    } catch (error) {
      console.info(error);
      setIsLoading('error');
    }
  };

  public updateNote = async (
    noteId: string,
    body: NewNote,
    notes: Note[],
    setNotes: (arg: Note[]) => void,
    setIsLoading: (arg: IsLoadingState) => void
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const res = await req.put<NoteResponse>(`/notes/${noteId}`, body);
      if (res.status === 200) {
        const newNotesArray = notes.filter((note) => note._id !== noteId);
        setNotes([...newNotesArray, res.data]);
        setIsLoading(false);
      } else throw new Error(res.message);
    } catch (error) {
      console.info(error);
      setIsLoading('error');
    }
  };

  public deleteNote = async (
    noteId: string,
    notes: Note[],
    setNotes: (arg: Note[]) => void,
    setIsLoading: (arg: IsLoadingState) => void
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const res = await req.del<NoteResponse>(`/notes/${noteId}`);
      if (res.status === 204) {
        setIsLoading(false);
        setNotes(notes.filter((note) => note._id !== noteId));
      } else throw new Error(res.message);
    } catch (error) {
      console.info(error);
      setIsLoading('error');
    }
  };
} // end

export const { getNotes, getNote, createNote, updateNote, deleteNote } = new NotesService();
