const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors', 
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response; 
}

export default postData