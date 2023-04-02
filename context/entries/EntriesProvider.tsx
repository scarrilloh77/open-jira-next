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
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        'Magnam consequuntur a ex, tenetur nostrum cumque possimus dolore',
      status: 'in-progress',
      createdAt: Date.now() - 100000,
    },
    {
      _id: uuidv4(),
      description: 'blanditiis quaerat ea fugiat recusandae! Veniam maiores',
      status: 'finished',
      createdAt: Date.now() - 10000,
    },
  ],
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  return (
    <EntriesContext.Provider value={{ ...state }}>
      {children}
    </EntriesContext.Provider>
  );
};
