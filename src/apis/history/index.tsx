'use client';
// add User History Api

export async function addUserHistoryApi(FormData: any) {
    return fetch('http://localhost:5001/api/history/createUserHistory', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Forgot Password Error:', error);
            throw error;
        });
}

// get User History Api
export async function getUserHistoryApi(userId: string) {
    return fetch(`http://localhost:5001/api/history/getUserHistory/${userId}`, {
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
// get User History Api
export async function deleteUserHistoryApi(id: string) {
    return fetch(`http://localhost:5001/api/history/deleteHistory/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Delete User History Error:', error);
            throw error;
        });
}
