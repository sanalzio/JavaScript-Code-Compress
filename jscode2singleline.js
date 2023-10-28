function remtab(text) {
    let lines = text.split("\n");
    let stripped_lines = lines.map(line => {
        return line.trimLeft();
    });
    return stripped_lines.join("\n");
}

function compresscode(code) {
    let lines = code.split('\n');
    let result = '';
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        result += remtab(line);
    }
    return result
}

let utf8Encode = new TextEncoder();
// utf8Encode.encode("abc");

let code = `function sleep(ms) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if (new Date().getTime() - start > ms) {
            break;
        }
    }
};`

function compress(code) {
    let output = compresscode(code);
    console.log(output);
    console.log(`The original code is ${utf8Encode.encode(code).length} bytes.`);
    console.log(`The compressed code is ${utf8Encode.encode(output).length} bytes.`);
    console.log(`Size gain is ${utf8Encode.encode(code).length-utf8Encode.encode(output).length} bytes.`);
}

compress(code);