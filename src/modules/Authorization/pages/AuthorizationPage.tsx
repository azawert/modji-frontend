import { useForm, SubmitHandler } from 'react-hook-form';
import { EMAIL_VALIDATION_PATTERN, TAuthUser } from "../const"

import { Box, Avatar, Typography } from '@mui/material';
import { TextField } from "@/shared/ui/TextField"
import { Button, EButtonSize, EButtonVariant } from '@/shared/ui/Button';

export const AuthorizationPage: React.FC = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<TAuthUser>({
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<TAuthUser> = async (data) => {
    try {
      console.log('Login data:', data); // Здесь можно добавить API вызов для аутентификации
      // Пример: await login(data.email, data.password);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      minHeight="100vh" 
      sx={{
        backgroundImage: 'url(src/assets/images/bg.png)', 
    }}>
      <Box 
        component="form" 
        onSubmit={handleSubmit(onSubmit)} 
        p={6} 
        bgcolor="white" 
        boxShadow={3} 
        borderRadius={4} 
        textAlign="center" 
        width={487} 
      >
        <Avatar 
          src="src/assets/logo.svg" 
          alt="Logo" 
          sx={{ 
            width: 64, 
            height: 64, 
            marginX: 'auto', 
            marginBottom: 1 
          }} 
        />
        <Typography 
          component="h2" 
          sx={{
            fontSize: '36px', 
            fontWeight: 800, 
            lineHeight: '48px',
          }}
          mb={3}
        >
          Pet's Home
        </Typography>
        <Typography 
          variant="subtitle1" 
          gutterBottom
        >
          Вход в систему
        </Typography>
        <TextField
          id="email"
          placeholder="Электронная почта"
          error={errors.email?.message}
          {...register('email', {
            required: {
              value: true, 
              message: "Пожалуйста, введите адрес электронной почты",
            },
            pattern: {
              value: EMAIL_VALIDATION_PATTERN,
              message: "Электронная почта введена некорректно",
            },
          })}
        />
        <TextField
          id="password"
          type="password"
          placeholder="Пароль"
          marginBottom="32px"
          error={errors.password?.message}
          {...register("password", {
            required: {
              value: true,
              message: "Пожалуйста, введите пароль",
            },
          })}
        />
        <Button
          size={EButtonSize.Large}
          variant={EButtonVariant.Primary}
          type="submit"
          fontSize={16}
          fontWeight={700}
          disabled={isSubmitting}
          style={{
            width: "100%",
          }}
        >
          Войти
      </Button>
      </Box>
    </Box>
  );
}