const title = document.getElementById('');
const btn = document.getElementById('btn-task');
const form = document.getElementById('form')

const urlHost = "http://localhost:3000/taches";
let tache = {};

btn.addEventListener('click', ()=>{
    //const formData = new FormData(form);console.log(formData);
    console.log(form.children[0].value);
    tache = {
        title: form.children[0].value,
        created_at: new Date(),
        update_at:'',
        status: form.children[2].value,
    }
    addTask(urlHost, tache).then((data) => {
        if(data){
            let div = document.createElement('div');
            div.className = "alert";
            let p =document.createElement('p');
        }
    }).catch(err=>{});
})

async function addTask(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
  