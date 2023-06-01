axios.get('http://localhost:3000/users')
    .then(function (response) {
        document.getElementById('exibir').innerHTML = response.data.map(function (users) {
            return (
                '<tr>' +
                '<td> <a class="btn btn-outline-info btn-sm" href="#" role="button" onclick="javascript:return editUser(`' + users._id + '`);">Edit</a> </td>' +
                '<th scope="row">' + users._id + '</th>' +
                '<td>' + users.name + '</td>' +
                '<td>' + users.email + '</td>' +
                '<td>' + users.password + '</td>' +
                '<td>' + users.phone + '</td>' +
                '<td> <a class="btn btn-outline-danger btn-sm" href="#" role="button" onclick="javascript:return deleteUser(`' + users._id + '`);">Delete</a> </td>' +
                '</tr>'
            );
        }).join('');
    })
    .catch(function (err) {
        document.getElementById('output').innerHTML = '<div class="alert alert-danger" role="alert">' + err.message + '</div>';
    });

const editUser = id => {
    window.location.href = 'editUser.html?id=' + id + '';
}

const deleteUser = id => {
    axios.delete('http://localhost:3000/users/' + id + '')
        .then(function (response) {
            document.getElementById("output").innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>' + "Deleted !" + '</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
            setTimeout(() => {
                location.reload();
            }, 1000);
        })
        .catch(function (err) {
            document.getElementById("output").innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>' + err.message + '</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        });
}