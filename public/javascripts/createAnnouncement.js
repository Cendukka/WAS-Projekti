function createAnnouncement() {
    const token = document.getElementById("token").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const content = document.getElementById("content").value;
    const expirationDate = document.getElementById("expire-time").value;
    const category = Array.from(document.getElementsByName("categoryRadio")).find(r => r.checked).value;


    axios.post('/api/announcement/', {
        name: name,
        email: email,
        content: content,
        expirationDate: expirationDate,
        category: category
    }, {
        headers: {"X-CSRF-Token": token}
    })
        .then(function (response) {
            // location.href = '/someWhere';
        })
        .catch(function (error) {
            if (error.response.data.error && error.response.data.error.code === 'EBADCSRFTOKEN') {
                console.log('NOPE!');
                return;
            }
            location.href = `create?error=${error.response.data}`;
        });

}

