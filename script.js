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

function downloadFile(content, filename) {
    const blob = new Blob([content], { type: "application/octet-stream" });
    const downloadLink = document.createElement("a");
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = filename;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

let mycode = `function sleep(ms) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if (new Date().getTime() - start > ms) {
            break;
        }
    }
};`

let editor = document.getElementById("code");
let out = document.getElementById("output");
let codes = document.getElementById("codesize");
let outs = document.getElementById("outsize");
let gains = document.getElementById("gainsize");

function compress(code) {
    let output = compresscode(code);
    out.innerHTML = output
    codes.innerHTML = utf8Encode.encode(code).length
    outs.innerHTML = utf8Encode.encode(output).length
    gains.innerHTML = utf8Encode.encode(code).length-utf8Encode.encode(output).length
    // console.log(output);
    // console.log(`The original code is ${utf8Encode.encode(code).length} bytes.`);
    // console.log(`The compressed code is ${utf8Encode.encode(output).length} bytes.`);
    // console.log(`Size gain is ${utf8Encode.encode(code).length-utf8Encode.encode(output).length} bytes.`);
}

editor.addEventListener('input', ()=>{
    compress(editor.value)
});