//recarga de pagina,funcion global
import React from 'react';

const DataContext = React.createContext({
  reloadData: () => {},
});

export default DataContext;