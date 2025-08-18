'use client';
// Verify Email
export async function verifyEmailApi(token:any) {
    return fetch(`http://localhost:5001/api/verify/${token}`, {
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
            console.error('Verify Email Error:', error);
            throw error;
        });
}

// Forgot Password
export async function forgotPasswordApi(payload:any) {
    return fetch('http://localhost:5001/api/auth/forgot-password', {
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

// Reset Password
export async function resetPasswordAPi( payload:any) {
    return fetch(`http://localhost:5001/api/auth/reset-password`, {
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
            console.error('Reset Password Error:', error);
            throw error;
        });
}
// Auth API functions for signup and login

export async function signupApi(payload:any) {
    return fetch('http://localhost:5001/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
        .then(response => response.json())
        .then(data => {
            // Handle response data
            return data;
        })
        .catch(error => {
            // Handle error
            console.error('Signup Error:', error);
            throw error;
        });
}

export async function loginApi(payload:any) {
    return fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
        .then(response => response.json())
        .then(data => {
            // Handle response data
            return data;
        })
        .catch(error => {
            // Handle error
            console.error('Login Error:', error);
            throw error;
        });
}
