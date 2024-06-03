


import { createContext , useState} from "react";

export const UserContext =createContext(null);

export const UserProvider = (props)=>{

    const [user, setUser] = useState(null);
    const [userSymbol, setUserSymbol] = useState(null);
    const [expiry, setExpiry] = useState(null);
    const [lot, setLot] = useState(null);
        return(
            <UserContext.Provider value={{user ,setUser, userSymbol ,setUserSymbol , expiry , setExpiry ,lot ,setLot}}>
                {props.children}
            </UserContext.Provider>

        )
}
