import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import data from '../data/initialUsersData.json';
import Cookies from 'js-cookie';

// initial value
const UsersContext = createContext({
  usersData: [],
  setUsersData: () => {},
  loading: true,
});

const COOKIE_DATA_AMOUNT = 10;

// value provider
export const ContextProvider = ({ children }) => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookiesData, setCookiesData] = useState('');

  console.log('usersData', usersData);

  useEffect(() => {
    setLoading(true);
    let dataFromCookie = Cookies.get('data0');
    let cookiesData = [];
    let cookieIndex = 0;
    while (dataFromCookie) {
      cookiesData = [...cookiesData, ...JSON.parse(dataFromCookie)];
      cookieIndex += COOKIE_DATA_AMOUNT;
      dataFromCookie = Cookies.get(`data${cookieIndex}`);
    }
    setCookiesData(JSON.stringify(cookiesData));

    if (cookiesData) {
      setUsersData(cookiesData);
    } else {
      const t = setTimeout(() => {
        setUsersData(data);
      }, 2000);
  
      return () => {
        clearTimeout(t);
      };
    }
    setLoading(false);
  }, []);

  const updateCookies = (data) => {
    for (let i = 0; i < data.length; i+=COOKIE_DATA_AMOUNT) {
      const stringData = JSON.stringify(data.slice(i, i+COOKIE_DATA_AMOUNT));
      Cookies.set(`data${i}`, stringData, { expires: 1 }); // Cookie expires in 1 day
    }   
  }

  useEffect(() => {
    if (usersData.length && (!Cookies.get('data0') || cookiesData != JSON.stringify(usersData))) {
      updateCookies(usersData);
    }
  }, [usersData]);

  const contextValue = useMemo(() => ({ usersData, setUsersData, loading }), [usersData]);

  return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>;
};

// consumer
export const useUsersContext = () => useContext(UsersContext);

export default UsersContext;
