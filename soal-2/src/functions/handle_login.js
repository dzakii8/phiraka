
export const handleLogin = async (username, password) => {

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const prod = await response.json()
    localStorage.setItem('status', prod.message)
    return prod.message
  } catch (error) {
    console.log(error);
  }
}
