const sock = io();

//Client Counter
sock.on('refresh counter', (data) => {
    $('#clients-count').text(data.description);
});