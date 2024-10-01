export async function fetchWithAuth(url, options = {}){

    const token = localStorage.getItem('authToken')

    const headers = {

        'Content-Type':'application/json',
        
        ...(token ? { 'Authorization' : `Bearer ${token}` } : {}),

        ...options.headers,

    };

    const response = await fetch(url, {

        ...options,

        headers

    });

    if(!response.ok){

        const error = new Error('An error occurred');

        error.response = response;

        throw error;

    }

    return response.json();

}