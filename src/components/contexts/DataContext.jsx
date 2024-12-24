import { createContext, useEffect, useState } from 'react';

export const DataContext = createContext();

function DataContextProvider({ children }) {
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
    fetch('http://localhost:4000/artifacts')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [change]);
  // useEffect(() => {
  //   fetch('http://localhost:4000/visaApplications')
  //     .then((response) => response.json())
  //     .then((data) => setApplications(data));
  // }, [change]);

  return (
    <DataContext.Provider
      value={{
        applications,
        updateApplications,
        data,
        updateData,
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
