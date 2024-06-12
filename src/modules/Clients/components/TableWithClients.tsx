
import { CardWithClient } from '@/shared/ui/CardWithClient';
import { CardWithPet } from '@/shared/ui/CardWithPet';
import { TableComponent } from '@/shared/ui/TableComponent';
import { Box } from '@mui/material';

interface Client {
  fullName: string;
  primaryPhone: string;
  secondaryPhone: string;
  registrationDate: string;
}

interface Pet {
  petName: string;
  petType: string;
  breed: string;
}

interface ClientData {
  client: Client;
  pets: Pet[];
}

const clientData: ClientData[] = [
  {
    client: {
      fullName: 'Петров Петр Петрович',
      primaryPhone: '+7 (986) 555 55 55',
      secondaryPhone: '+7 (986) 666 66 66',
      registrationDate: '05.12.2023',
    },
    pets: [
      { petName: 'Марсик', petType: 'Собака', breed: 'Бигль' },
      { petName: 'Марсик', petType: 'Собака', breed: 'Бигль' },
      { petName: 'Марсик', petType: 'Собака', breed: 'Бигль' },
      { petName: 'Марсик', petType: 'Собака', breed: 'Бигль' },
      { petName: 'Марсик', petType: 'Собака', breed: 'Бигль' },
    ],
  },
  {
    client: {
      fullName: 'Петров Петр Петрович',
      primaryPhone: '+7 (986) 555 55 55',
      secondaryPhone: '+7 (986) 666 66 66',
      registrationDate: '05.12.2023',
    },
    pets: [
      { petName: 'Марсик', petType: 'Собака', breed: 'Бигль' },
      { petName: 'Марсик', petType: 'Собака', breed: 'Бигль' },
    ],
  },
];

const columns = [
  { id: 'client', label: 'Данные клиента', width: 312 },
  { id: 'pets', label: 'Данные питомцев', flex: 1 },
];

export const TableWithClients: React.FC = () => {
  const rows = clientData.map(data => ({
    client: (
      <CardWithClient
        fullName={data.client.fullName}
        primaryPhone={data.client.primaryPhone}
        secondaryPhone={data.client.secondaryPhone}
        registrationDate={data.client.registrationDate}
      />
    ),
    pets: (
      <Box 
        display="flex" 
        flexDirection="row"
        flexWrap="wrap"
        gap="12px 16px"
      >
        {data.pets.map((pet, petIndex) => (
          <CardWithPet
            key={petIndex}
            petName={pet.petName}
            petType={pet.petType}
            breed={pet.breed}
          />
        ))}
      </Box>
    ),
  }));

  return (
    <Box>
      <TableComponent columns={columns} rows={rows} />
    </Box>
  );
};