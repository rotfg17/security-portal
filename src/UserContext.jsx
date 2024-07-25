import React, { createContext, useContext, useState } from 'react';
import { Admin, Staff, Client } from './Pages/clases/users';

// Create a useContext for user
const UserContext = createContext();

//Create a component to provide the context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //Function to manage the login
  const login = (userData) => {
    let userInstance;
    switch (userData.role) {
      case 'a':
        userInstance = new Admin(userData.email, userData.pass);
        break;
      case 's':
        userInstance = new Staff(userData.email, userData.pass);
        break;
      case 'c':
        userInstance = new Client(userData.email, userData.pass);
        break;
      default:
        break;
    }
    setUser(userInstance);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
