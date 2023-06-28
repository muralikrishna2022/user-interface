import { createContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({children}) {

  const [userStatus, setUser] = useState({
    username: '',
    userid: '',
    authenticated: false
  })

  const updateUser = (name, value) => {
    setUser({...userStatus, [name]: value})
  }
  
  return(
    <UserContext.Provider value={{ userStatus, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;