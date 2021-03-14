"use strict";

function trim(list){
    list.forEach((string, i) => {
        if(string.length > 1)
            list[i] = string.slice(0,2) + string.slice(-2);
        else
            list[i] = "";
    })
}

let arr = ["ciaociao", "ciao", "notsogood", "javascript", "yo"];

console.log(arr);
trim(arr);
console.log(arr);