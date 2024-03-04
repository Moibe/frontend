import './App.css';
import React, { useState, useEffect, useRef } from 'react';

function App() {
  const title = 'Lista de Usuarios'
  const [users, setUsers] = useState([]);
  const [isColored, setIsColored] = useState(false);
  const initialUsersRef = useRef([]);
  const [searchValue, setSearchValue] = useState('');
  
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(response => response.json())
      .then(data => {
        setUsers(data.results);
        initialUsersRef.current = data.results; // Update the reference
      });
  }, []);

  const handleSortCountry = () => {
    const sortedUsers = [...users].sort((a, b) =>
      a.location.country.localeCompare(b.location.country)
    );
    setUsers(sortedUsers);
  };

  const handleRestoreState = () => {
    setUsers(initialUsersRef.current);
  };

  const handleColorRows = () => {
    setIsColored(!isColored);
  };


  const handleDelete = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    const filteredUsers = users.filter((user) =>
      user.location.country.toLowerCase().includes(searchValue.toLowerCase())
    );
    setUsers(filteredUsers);
  };
  
  return (
    <div className="App">
      <h1>{title}</h1>
      <button onClick={handleColorRows}>Colorear filas</button>
      <button onClick={handleSortCountry}>Ordenar por país</button>
      <button onClick={handleRestoreState}>Restaurar estado inicial</button>
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Buscar..."
      />
      <hr></hr>
      <table border="1" align='center'>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>País</th>
            <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.login.uuid}
            style={{
              backgroundColor: isColored
                ? index % 2 === 0
                  ? '#112233'
                  : '#556677'
                : '',
            }}>
              <td><img src={user.picture.thumbnail} alt="Imagen de usuario" /></td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Eliminar</button>
              </td>
             </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
