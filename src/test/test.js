const regex = ["hello", "world", "sd", "indonesia", "computer"].filter((data) =>  {
    if(data.search("3") !== -1) {
        return data
    } 
})

const petren = "hello"
console.log(petren.match(/q/g))
console.log(regex)