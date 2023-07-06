import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();
const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches;
  const storeDarkmode = localStorage.getItem('darkTheme');
  console.log('pppere', prefersDarkMode);
  console.log('storedark', storeDarkmode);
  if (storeDarkmode === null) {
    return prefersDarkMode;
  }
  if (storeDarkmode !== null) {
    return storeDarkmode === 'true';
  }
};
//matches return true/false
//at initail mount the value is true then the value is false so we should use useffect
export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchTerm, setsearchTerm] = useState('cat');
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };
  //useeffect initially mounts the class
  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);
  return <AppContext.Provider value={{ isDarkTheme, searchTerm, setsearchTerm, toggleDarkTheme }}>{children}</AppContext.Provider>;
};

//we pass the value as a obj through provider

export const useGlobalContext = () => useContext(AppContext);

//if we didnt use this above fn then we will use the invoke the usecontext in every componenet we  should invoke/use usecontext() in every component
