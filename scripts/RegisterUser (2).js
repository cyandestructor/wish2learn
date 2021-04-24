export function registerUser(user) {
    const endpoint = 'http://localhost/api/post/RegisterUser.php';

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(result => { return result.json(); })
    .then(data => { console.log(data); });
}