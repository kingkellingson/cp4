console.log("hello world")

document.getElementById("submitButton2").addEventListener("click", function(event) {
    event.preventDefault();
    
    const value = document.getElementById("submitInput2").value;
    
    if (value === "") return;

    if (isNaN(value)) 
    {
        let message = value + " is not a valid password!"
        alert(message)
        return
    }

    if (value > 80) 
    {
        let message = "Enter a smaller number! (less than 80)"
        alert(message)
        return
    }

    console.log(value);

    const url1 = "https://passwordinator.herokuapp.com/generate?char=true&caps=true&len=" + value
  
    console.log("done1");

    const url2 = "https://www.swapi.tech/api/people/" + value
    fetch(url1)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
        let results = "";
        console.log(json)

         let message = "'"+ json.data + "' is your new password"
         alert(message)

    }).then(fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
        let results = "";
        console.log(json)

        let name = json.result.properties.name
         let message = "Your new username: "+ name
         alert(message)

         document.getElementById("welcome").innerHTML = 
         "<h4>Welcome,</h4> <h5>"+ name+ "</h5>"

    }))

    console.log("done2");

   

})

fetch ("http://apimeme.com/meme?meme=Advice-Dog&top=hi&bottom=hi")
.then(function(response) {
  return response.json();
}).then(function(json) {
  console.log("new api: ", json)
})

