import { FC, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';
import { entriesApi } from '../../apis';

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: 'pending',
    };
    dispatch({ type: '[Entry] - Add-Entry', payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: '[Entry] - Entry-Updated', payload: entry });
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries'); // El Entry se importa de las interface. NO DE LOS MODELS (BACKEND).
    dispatch({ type: '[Entry] - Refresh-Data', payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
