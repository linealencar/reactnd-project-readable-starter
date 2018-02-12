const api = 'http://localhost:3001';

const headers = {
  Authorization: 'Aline'
};

export const getAll = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);
