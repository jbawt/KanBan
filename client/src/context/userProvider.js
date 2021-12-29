import React, { useContext, createContext, useState, useEffect } from 'react';
import checkAuth from '../helpers/checkAuth';

const UserContext = createContext();
const UpdateUserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function useUpdateUserContext() {
  return useContext(UpdateUserContext);
}

function UserProvider({ children }) {

  const [userInfo, setUserInfo] = useState({
    user: [],
    projects: [],
    archivedProjects: [],
    loggedIn: false,
  });

  function updateUser(userObj) {
    setUserInfo(userObj);
  };

  useEffect(() => {
    checkAuth(setUserInfo);
  }, []);

  return (
    <UserContext.Provider value={userInfo}>
      <UpdateUserContext.Provider value={updateUser}>
        {children}
      </UpdateUserContext.Provider>
    </UserContext.Provider>
  )
}

export default UserProvider
