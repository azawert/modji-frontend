import React from 'react';
import { Typography, Box, styled } from '@mui/material';
import { CardWrapper } from '@/shared/ui/CardWrapper';

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
}))
const InfoTitle = styled(Typography)(() => ({
  color: '#757575',
  fontSize: '12px',
  fontWeight: 400,
  lineHeight: '16px',
}));

const InfoValue = styled(Typography)(() => ({
  color: '#181A1A',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
}));

interface CardWithClientProps {
  fullName: string;
  primaryPhone: string;
  secondaryPhone: string;
  registrationDate: string;
}

export const CardWithClient: React.FC<CardWithClientProps> = ({ fullName, primaryPhone, secondaryPhone, registrationDate }) => {
  return (
    <CardWrapper bgColor="#F6F8FF">
      <StyledBox>
        <InfoTitle>ФИО</InfoTitle>
        <InfoValue>{fullName}</InfoValue>
      </StyledBox>
      <StyledBox>
        <InfoTitle>Основной телефон</InfoTitle>
        <InfoValue>{primaryPhone}</InfoValue>
      </StyledBox>
      <StyledBox>
        <InfoTitle>Второй телефон</InfoTitle>
        <InfoValue>{secondaryPhone}</InfoValue>
      </StyledBox>
      <StyledBox>
        <InfoTitle>Дата регистрации</InfoTitle>
        <InfoValue>{registrationDate}</InfoValue>
      </StyledBox>
    </CardWrapper>
  );
};