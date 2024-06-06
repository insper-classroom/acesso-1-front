import React, { useState } from 'react';
import { Button } from '@mui/material';

export function SignUp() {
  const [signupLink, setSignupLink] = useState('');

  const generateSignUpLink = async () => {
    try {
      const response = await fetch('http://localhost:8080/signup');
      if (!response.ok) {
        throw new Error('Failed to fetch signup link');
      }
      const link = await response.text();
      
      const token = link.split('/').pop();

      const frontendLink = `http://localhost:5173/cadastrausuarios/${token}`;
      setSignupLink(frontendLink);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={generateSignUpLink}>Gerar Link de Cadastro</Button>
      {signupLink && <p style={{ color: 'blue' }}>{signupLink}</p>}
    </div>
  );
}
