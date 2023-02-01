import * as require from "./test.js";
import * as crud from "./crud.js";
const alertElt = document.getElementById("alert");
let idElemetToUpdate = null;

const btn = document.getElementById("btn-task");

//Test d'ajout
const btn_add = document.getElementById("btn-add");
btn_add.addEventListener("click", testAdd);
// And test
async function testAdd(){
  const task = {
    title: "Tester Ajout Aubaa",
    created_at: "31/01/2023",
    update_at: "",
    status: "pending",
  };
  const maData = await crud.addTask("http://localhost:3000/taches/", task);
  const reponse = await require.getTaskById("http://localhost:3000/taches", maData.id);
  const taskGet = await reponse.json();
  //console.log(modData);
  console.log(require.verifyTaskAdd(task, taskGet));
  if (require.verifyTaskAdd(task, taskGet)) {
    //require.verifyTaskAdd(task, taskGet)
    crud.deleteTask(maData.id);
  }
}
//Test de modification
 const btn_mod = document.getElementById("btn-mod");
  btn_mod.addEventListener("click", testMod);

  async function testMod(){
    const task = {
      title: "Tester Ajout Aubaaaaa",
      created_at: "31/01/2023",
      update_at: "",
      status: "pending",
    };

    const taskMod = {
      title: "Test Aubaaaaa",
      created_at: "30/01/2022",
      update_at: "22/01/2023",
      status: "Done",
    };
    const maData = await crud.addTask("http://localhost:3000/taches/", task);
    const modData = await crud.updateTask(maData.id, taskMod);
    const reponse = await require.getTaskById("http://localhost:3000/taches", modData.id);
    const taskGet = await reponse.json();
    //console.log(modData);
    console.log(require.verifyTask(taskMod, taskGet));
    if(require.verifyTask(taskMod, taskGet)) {
      crud.deleteTask(maData.id);
    }
  }

//Test de suppression
const btn_del = document.getElementById("btn-del");
btn_del.addEventListener("click", testDel);

async function testDel(){
  const task = {
    title: "Tester Ajout Aubaaaaa",
    created_at: "31/01/2023",
    update_at: "",
    status: "pending",
  };
  const maData = await crud.addTask("http://localhost:3000/taches/", task);
  const delData = await crud.deleteTask(maData.id);
  const reponse = await require.getTaskById("http://localhost:3000/taches", maData.id);
  if(reponse.ok){
    console.log(false);
    //return false;
  }else{
   console.log(true);
   //return true;
  }
}

const btn_all = document.getElementById("btn-all");
btn_all.addEventListener('click', ()=>{
  testAdd();
  // testMod();
})

const title = document.getElementById("input-task");
const getAllData = document.getElementById("getAllData");

//Test
// const btn_test = document.getElementById("btn-test");

const form = document.querySelector("form");
form.addEventListener("submit", (e) => deleteTask(e));

const urlHost = "http://localhost:3000/taches";

let tache = {};

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

// testAdd();
// console.log("test globale");
// testMod();
// console.log("test globale");
// testDel();
// console.log("test globale");

const getTask = (element) => {
  title.value = element.title;
  idElemetToUpdate = element.id;
  btn.textContent = "Modifier";
};

btn.addEventListener("click", () => {
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

  if (btn.textContent === "Modifier" && idElemetToUpdate != null) {
    if (testUpdate(tache) == 0) {
      updateTask(idElemetToUpdate, title.value);
      idElemetToUpdate = null;
      console.log("Updated task");
    }
  } else {
    console.log("Created task");
    crud.addTask(urlHost, tache)
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
  }
});

async function getDataOfTask() {
  var myHeaders = new Headers();

  var options = {
    method: "GET",

    headers: myHeaders,

    mode: "cors",

    cache: "default",
  };

  const response = await fetch(urlHost, options);

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
      a5.addEventListener("click", (e) => crud.deleteTask(element.id));

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
      //console.log(ul);
      getAllData.append(ul);
    });
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
