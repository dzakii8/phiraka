
export const handleAdd = async (user) => {

  try {
    const response = await fetch('http://localhost:3000/api/user', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const prod = await response.json()
    return prod.message
  } catch (error) {
    console.log(error);
  }
}

