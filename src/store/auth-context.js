import React, {useState, useEffect} from 'react';

const authContext = React.createContext( { 
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});


export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoggedIn = localStorage.getItem('isLoggedIn');
    
        if( checkLoggedIn === '1') {
          setIsLoggedIn(true);
        }
      }, []);

    const loginHandler = (email, password) => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };
    
    const logoutHandler = () => {
        localStorage.setItem('isLoggedIn', '0');
        setIsLoggedIn(false);
    };

    return (
        <authContext.Provider value={ {
            isLoggedIn: isLoggedIn,
            onLogin: loginHandler,
            onLogout: logoutHandler
        }}>
            {props.children}
        </authContext.Provider>
    )
}

export default authContext;