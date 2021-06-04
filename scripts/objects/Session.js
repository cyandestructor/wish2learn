export const getCurrentUserId = () => {
    const endpoint = 'http://localhost/api/session';

    return fetch(endpoint).then((response) => {
        if (response.ok) {
            return response.json();
        }

        return null;
    });
};
