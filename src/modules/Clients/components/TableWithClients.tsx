import { OwnerDto } from '@/generated/owners';
import { CardWithClient } from '@/shared/ui/CardWithClient';
import { CardWithPet } from '@/shared/ui/CardWithPet';
import { TableComponent } from '@/shared/ui/TableComponent';
import { Box } from '@mui/material';
import { mapResponseToTableView } from '../utils';

import { ERROR_MESSAGES } from '@/shared/constants/errors';

interface IProps {
  isLoading: boolean;
  isError: boolean;
  data: OwnerDto[];
  error: Error | null;
}

interface Client {
  fullName: string;
  mainPhone?: string;
  optionalPhone?: string;
  registrationDate?: string;
}

interface Pet {
  petName: string;
  petType: string;
  breed: string;
}

export interface ClientData {
  client: Client;
  pets: Pet[];
}

const columns = [
  { id: 'client', label: 'Данные клиента', width: 312 },
  { id: 'pets', label: 'Данные питомцев', flex: 1 },
];

const getErrorMessage = (error: Error | null): string | null => {
  if (!error) return null;
  const matchedError = Object.keys(ERROR_MESSAGES).find((code) =>
    error.message.includes(code)
  );
  return matchedError ? ERROR_MESSAGES[matchedError] : 'Неизвестная ошибка';
};

export const TableWithClients: React.FC<IProps> = ({
  data, 
  isLoading, 
  isError,
  error
}) => {
  const rows = mapResponseToTableView(data).map(data => ({
    client: (
      <CardWithClient
        fullName={data.client.fullName}
        mainPhone={data.client.mainPhone}
        optionalPhone={data.client.optionalPhone}
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
      <TableComponent 
        columns={columns} 
        rows={isLoading || isError ? [] : rows} 
      />
      {isLoading && 
        <div className='flex justify-center m-40'>
          Загрузка...
        </div>}
      {isError && error && 
        <div className='flex justify-center m-40'>
          {getErrorMessage(error)}
        </div>}
    </Box>
  );
};