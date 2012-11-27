$(document).ready(function() {
    var socket = io.connect('http://localhost', {port: 8080});
    var prev_text = "";
    var dmp = new diff_match_patch();

    $("#editor").keyup(function(event) {
        var text = $("#editor").val();
        var patches = dmp.patch_make(prev_text, text);
        prev_text = text;
        console.log(dmp.patch_toText(patches));
        socket.emit('diff', { my: patches });
    });

    socket.on('message', function(data) {
        var patches = data['my'];
        console.log(patches);
        var text = $("#editor").val();
        var new_text = dmp.patch_apply(patches, text);
        $("#editor").val(new_text[0]);
    });
});
