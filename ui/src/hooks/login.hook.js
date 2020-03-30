import { useState, useCallback } from 'react'

const storageName = 'userData';

export const useLogin = () => {

  const userData = JSON.parse(localStorage.getItem('userData'));

  const [token, setToken] = useState(userData && userData.token || null);

  const [userId, setUserId] = useState(null);


  const login = useCallback( (jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);
    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken
    }))
  }, []);

  const logout = useCallback( () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName)
  }, []);



  return { login, logout, token, userId }

};
