'use client';
// add User History Api

export async function addUserHistoryApi(payload: any) {
    return fetch('http://localhost:5001/api/history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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
