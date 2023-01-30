const alertElt = document.getElementById('alert');
const btn = document.getElementById('btn-task');
const title = document.getElementById('input-task');
const getAllData = document.getElementById('getAllData');

const urlHost = "http://localhost:3000/taches";
let tache = {};

//On crée une date
let date1 = new Date();
let dateLocale = date1.toLocaleString('fr-FR',{
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'});

btn.addEventListener('click', (e)=>{
    //const formData = new FormData(form);console.log(formData);
    //console.log(form.children[0].value);
    e.preventDefault();
    tache = {
        title: title.value,
        created_at: dateLocale,
        update_at:'',
        status: "pending",
    }
    console.log(tache);
    addTask(urlHost, tache).then((data) => {
        if(data){
            let div = document.createElement('div');
            div.className = "alert alert-success";
            div.role ='alert';
            let p =document.createElement('p');
            p.className="text-black fw-bold";
            p.textContent = "Ajout de la tâche avec succès."
            div.appendChild(p);
            alertElt.appendChild(div);
        }
    }).catch(err=>{
        console.log(err)
    });
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

async function getDataOfTask (){
    var myHeaders = new Headers();

    var myInit = { method: 'GET',
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default' };
    
    const response = await fetch(urlHost,myInit);
    if(response.ok){
        return response.json();
    }
}

getDataOfTask().then((data)=>{
    console.log(data);
}).catch(err=>{
    let div = document.createElement('div');
    div.className = "alert alert-success";
    div.role ='alert';
    let p =document.createElement('p');
    p.className="text-black fw-bold";
    p.textContent = "Error lors de la récuperation des tâches."
    div.appendChild(p);
    alertElt.appendChild(div);
})