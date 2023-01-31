const alertElt = document.getElementById("alert");

const btn = document.getElementById("btn-task");

const title = document.getElementById("input-task");

const btnUpdate = document.querySelector(".btn-update");

const btnDelete = document.querySelector(".btn-delete");

const input = document.getElementById("input");

const getAllData = document.getElementById("getAllData");

const form = document.querySelector("form");
form.addEventListener("submit", (e) => deleteTask(e));

const urlHost = "http://localhost:3000/taches";

let tache = {};

//On crée une date

let date1 = new Date();

let dateLocale = date1.toLocaleString("fr-FR", {
  weekday: "long",

  year: "numeric",

  month: "long",

  day: "numeric",

  hour: "numeric",

  minute: "numeric",

  second: "numeric",
});

const getTask = (element) => {
  console.log(element);

  title.value = element.title;
  btn.textContent = "Modifier";
  btn.onclick = updateTask(element.id,title.value);
};

async function updateTask(id,title) {
 
  const res = await fetch("http://localhost:3000/taches/" + id, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ title }),
  });
}

const deleteTask = (taskId) => {
  if (!taskId) return;

  const options = {
    method: "DELETE",

    headers: new Headers(),
  };

  fetch(`http://localhost:3000/taches/${taskId}`, options).catch((err) =>
    console.error(err)
  );
};

btn.addEventListener("click", () => {
  //const formData = new FormData(form);console.log(formData);

  //console.log(form.children[0].value);

  let date =
    new Date().getDay() +
    "/" +
    new Date().getMonth() +
    1 +
    "/" +
    new Date().getFullYear();

  tache = {
    title: title.value,

    created_at: date,

    update_at: "",

    status: "pending",
  };


  addTask(urlHost, tache)
    .then((data) => {
      if (data) {
        let div = document.createElement("div");

        div.className = "alert alert-success";

        div.role = "alert";

        let p = document.createElement("p");

        p.className = "text-black fw-bold";

        div.appendChild(p);

        alertElt.appendChild(div);
      }
    })

    .catch((err) => {
      console.log(err);
    });
});

async function addTask(url = "", data = {}) {
  // Default options are marked with *

  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.

    mode: "cors", // no-cors, *cors, same-origin

    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached

    credentials: "same-origin", // include, *same-origin, omit

    headers: {
      "Content-Type": "application/json",

      // 'Content-Type': 'application/x-www-form-urlencoded',
    },

    redirect: "follow", // manual, *follow, error

    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

async function getDataOfTask() {
  var myHeaders = new Headers();

  var myInit = {
    method: "GET",

    headers: myHeaders,

    mode: "cors",

    cache: "default",
  };

  const response = await fetch(urlHost, myInit);

  if (response.ok) {
    return response.json();
  }
}

getDataOfTask()
  .then((data) => {
    data.forEach((element) => {
      let ul = document.createElement("ul");
      ul.className = `list-group list-group-horizontal rounded-0`;

      let li = document.createElement("li");
      li.className = `list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0`;
      let div = document.createElement("div");
      div.className = `form-check`;

      let input = document.createElement("input");
      input.className = `form-check-input me-0`;
      input.setAttribute("type", "checkbox");
      input.setAttribute("value", element.id);
      div.append(input);
      li.append(div);

      let li2 = document.createElement("li");
      li2.className = `list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 `;
      let p = document.createElement("p");
      p.className = `lead fw-normal mb-0`;
      p.textContent = element.title;
      li2.append(p);

      let li3 = document.createElement("li");
      li3.className = `list-group-item px-3 py-1 d-flex align-items-center border-0 `;
      let div3 = document.createElement("div");
      div3.className = `py-2 px-1 me-1 border border-warning rounded-3 d-flex align-items-center bg-light`;

      let div4 = document.createElement("div");
      div4.className = `py-2 px-1 me-1 border border-warning rounded-3 d-flex align-items-center bg-light`;

      let div5 = document.createElement("div");
      div5.className = `py-2 px-1 me-1 border border-warning rounded-3 d-flex align-items-center bg-light`;

      let p3 = document.createElement("p");
      p3.className = `small mb-0`;
      p3.textContent = element.created_at;

      let a = document.createElement("a");
      a.innerHTML = `<i class="fas  fa fa-pencil me-2 text-info"></i>`;
      a.setAttribute("href", "#");
      a.setAttribute("id", element.id);
      a.addEventListener("click", (e) => {
        e.preventDefault();
        getTask(element);
      });

      let a5 = document.createElement("a");
      a5.innerHTML = `<i class="fas  fa-trash me-2 text-danger"></i>`;
      a5.setAttribute("href", "#");
      a5.setAttribute("id", element.id);
      a5.addEventListener("click", (e) => deleteTask(e.target.id));

      div3.appendChild(p3);
      li3.appendChild(div3);
      li3.append(div4);

      div4.append(a);
      li3.append(div4);

      div5.append(a5);
      li3.append(div5);

      ul.append(li);
      ul.append(li2);
      ul.append(li3);
      console.log(ul);
      getAllData.append(ul);
    });

    //Obtenir la clé et la valeur avec la fonction entries
    // for (const [key, value] of Object.entries(attributes)) {
    //   if (value !== null) {
    //     element.setAttribute(key, value);
    //   }
    // }

    // data.forEach((element) => {
    //   titleTask.innerHTML;
    // });
  })
  .catch((err) => {
    let div = document.createElement("div");

    div.className = "alert alert-danger";

    div.role = "alert";

    let p = document.createElement("p");

    p.className = "text-black fw-bold";

    // p.textContent = "Error lors de la récuperation des tâches.";

    div.appendChild(p);

    // alertElt.appendChild(div);
  });
