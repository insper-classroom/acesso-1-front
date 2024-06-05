import React, { useState } from 'react';

export function SignUp() {
  const [signupLink, setSignupLink] = useState('');

  const generateSignUpLink = async () => {
    try {
      const response = await fetch('http://localhost:8080/signup');
      if (!response.ok) {
        throw new Error('Failed to fetch signup link');
      }
      const link = await response.text();
      setSignupLink(link);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={generateSignUpLink}>Gerar Link de Cadastro</button>
      {signupLink && <p style={{ color: 'blue' }}>{signupLink}</p>}
    </div>
  );
}
