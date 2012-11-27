$(document).ready(function() {
    var socket = io.connect('http://localhost', {port: 8080});
    var prev_text = "";
    var dmp = new diff_match_patch();

    $("#editor").keyup(function(event) {
        // get current text in editor
        var text = $("#editor").val();

        // don't send empty text(send diffs maybe?)
        if (text.length > 0) {
            socket.emit('text', { my: text });
        }
    });

    socket.on('message', function(data) {
        var text2 = $("#editor").val();
        var text1 = data['my'];
        var patches = dmp.patch_make(text2, text1)
        var new_text = dmp.patch_apply(patches, text2);
        console.log(new_text);
        $("#editor").val(new_text[0]);
    });

});
