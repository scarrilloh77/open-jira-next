interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

// Aqui no se manejaran uuid sino IDs de mongo.

export const seedData: SeedData = {
  entries: [
    {
      description:
        'Pendiente: Lorem ipsum dolor sit amet consectetur adipisicing elit',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description:
        'En-Progreso: Magnam consequuntur a ex, tenetur nostrum cumque possimus dolore',
      status: 'in-progress',
      createdAt: Date.now() - 100000,
    },
    {
      description:
        'Terminadas: blanditiis quaerat ea fugiat recusandae! Veniam maiores',
      status: 'finished',
      createdAt: Date.now() - 10000,
    },
  ],
};
