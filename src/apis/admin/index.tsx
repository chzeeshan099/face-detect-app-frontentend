// get all Users Api
export async function getAllUsersApi() {
    return fetch(`http://localhost:5001/api/user/getAllUsers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Get User History Error:', error);
            throw error;
        });
}