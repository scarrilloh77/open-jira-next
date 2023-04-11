import { FC, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description:
        'Pendiente: Lorem ipsum dolor sit amet consectetur adipisicing elit',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        'En-Progreso: Magnam consequuntur a ex, tenetur nostrum cumque possimus dolore',
      status: 'in-progress',
      createdAt: Date.now() - 100000,
    },
    {
      _id: uuidv4(),
      description:
        'Terminadas: blanditiis quaerat ea fugiat recusandae! Veniam maiores',
      status: 'finished',
      createdAt: Date.now() - 10000,
    },
  ],
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

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
