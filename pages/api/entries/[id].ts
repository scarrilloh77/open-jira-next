import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Los querys SIEMPRE SON Strings.
  const { id } = req.query;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: `El id ${id} no es valido!` });
  }

  switch (req.method) {
    case 'GET':
      return getEntry(req, res);
    case 'PUT':
      return updateEntry(req, res);

    default:
      return res.status(400).json({ message: 'Metodo no existe!' });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await db.connect();

  const entryInDB = await Entry.findById(id);
  await db.disconnect();

  if (!entryInDB) {
    return res.status(400).json({ message: `No hay entrada con el id: ${id}` });
  }

  res.status(200).json(entryInDB);
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: `No hay entrada con el id: ${id}` });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    // Esto es una consulta a base de datos
    //runValidator para que valide que el status esta entre las opciones. new para que retorne el nuevo objeto actualizado.
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedEntry!); // El updatedEntry nunca sera null.
  } catch (error: any) {
    console.log({ error });
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};
