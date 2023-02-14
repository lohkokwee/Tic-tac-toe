const getData = async (url = '') => {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return response;
}

export default getData