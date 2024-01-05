
export default function (input = "..") {

if ( input.length){

    let truncated = input.slice(0, 16) + "..."
    return truncated
}

return ""

}

// export default truncat