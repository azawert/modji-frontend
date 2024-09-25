import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button, EButtonSize, EButtonVariant } from '@/shared/ui/Button/Button';

export const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      className="h-screen w-screen bg-gray-100"
      position={'absolute'}
      left={0}
      top={0}
      zIndex={-1}
      sx={{
        backgroundImage: 'url(src/assets/images/bg.png)',
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          width={488.54}
          height={328}
          p={6}
          bgcolor="white"
          borderRadius={4}
          boxShadow={6}
          display="flex"
          flexDirection="column"
          justifyContent="center"

        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontSize: '46px',
              fontWeight: 800, 
              lineHeight: '64px',
              textAlign: 'left',
            }}
            mb={3} 
          >
            Ошибка 404
          </Typography>

          <Typography 
            variant="body1" 
            sx={{
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '20px',
            }}
            mb={4}
            >
              О нет, кажется, вы попали на страницу, которой не существует. Зато остальные точно работают, давайте перейдем на другую.
          </Typography>
          <Box display="flex" gap={3} >
            <Button  
              size={EButtonSize.Medium} 
              variant={EButtonVariant.Secondary} 
              fontSize={16} 
              fontWeight={700}
              onClick={() => navigate(-1)}>
                Назад
            </Button>
            <Button
              size={EButtonSize.Medium}
              variant={EButtonVariant.Primary}
              fontSize={14}
              fontWeight={700}
              onClick={() => navigate('/')}
            >
              На главную
            </Button>
          </Box>
        </Box>
        <Box
          component="img"
          sx={{
            maxWidth: '100%',
            maxHeight: '100%',
          }}
          src="src/assets/images/cat404.png"
          alt="Кошка с надписью 404"
        />
      </Box>
  </Box>
  );    
};
