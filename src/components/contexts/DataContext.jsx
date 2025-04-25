import { createContext, useEffect, useState } from 'react';

export const DataContext = createContext();

function DataContextProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage for saved preference
    const savedMode = localStorage.getItem('isDark');
    // If found, use it (convert from string to boolean)
    // Otherwise default to true
    return savedMode !== null ? JSON.parse(savedMode) : true;
  });

  const handleDark = () => {
    setIsDark((prev) => {
      const newMode = !prev;
      // Save the new mode to localStorage
      localStorage.setItem('isDark', JSON.stringify(newMode));
      return newMode;
    });
  };

  const [mongoData, setMongoData] = useState(null);
  const [data, setData] = useState([]);
  const [applications, setApplications] = useState([]);
  const [change, setChange] = useState(0);
  const updateData = (newData) => {
    setData(newData);
  };
  const updateApplications = (newData) => {
    setApplications(newData);
  };
  const handleIncrement = () => {
    setChange(change + 1);
  };
  const handleDecrement = () => {
    setChange(change - 1);
  };

  useEffect(() => {
    fetch('https://auvral-server.vercel.app/artifacts')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [change]);

  return (
    <DataContext.Provider
      value={{
        applications,
        updateApplications,
        data,
        change,
        isDark,
        setIsDark,
        updateData,
        handleDark,
        setMongoData,
        mongoData,
        setChange,
        setData,
        handleIncrement,
        handleDecrement,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
