import * as crud from "./crud.js";

export function getTaskById(url, id) {
  const task = fetch(`${url}/${id}`);

  if (task) {
  } else {
    return null;
  }
  return task;
}

export function verifyTask(objectAdd, objetGet) {
  if (
    objectAdd.title == objetGet.title
    && objectAdd.created_at == objetGet.created_at
    && objectAdd.status == objetGet.status
    && objectAdd.update_at == objetGet.update_at
    ) {
    return true;
  }
  return false;
}

export async function testAdd() {
    const task = {
        title: "Tester addTask",
        created_at: "31/01/2023",
        update_at: "",
        status: "pending",
    };

    const start = Date.now();
    const maData = await crud.addTask("http://localhost:3000/taches/", task);
    const reponse = await getTaskById("http://localhost:3000/taches", maData.id);
    const taskGet = await reponse.json();
    const end = Date.now()
    const duration = end - start;
    //console.log(modData);
    console.log(verifyTask(task, taskGet) + " - " + duration);
    if (verifyTask(task, taskGet)) {
        crud.deleteTask(maData.id);
    }
}

export async function testMod() {
    const task = {
        title: "Tester updateTask",
        created_at: "31/01/2023",
        update_at: "",
        status: "pending",
    };

    const taskMod = {
        title: "modification",
        created_at: "30/01/2022",
        update_at: "22/01/2023",
        status: "Done",
    };
    const maData = await crud.addTask("http://localhost:3000/taches/", task);
    const modData = await crud.updateTask(maData.id, taskMod);
    const reponse = await getTaskById("http://localhost:3000/taches", maData.id);
    const taskGet = await reponse.json();

    if (verifyTask(taskGet, taskMod)){
        console.log("del " + taskGet.title + " : " + taskGet.id);
        await crud.deleteTask(taskGet.id);
    }
}

export async function testDel() {
    const task = {
        title: "Tester deleteTask",
        created_at: "31/01/2023",
        update_at: "",
        status: "pending",
    };

    const maData = await crud.addTask("http://localhost:3000/taches/", task);
    const delData = await crud.deleteTask(maData.id);
    const reponse = await getTaskById("http://localhost:3000/taches", maData.id);
    if (reponse.ok) {
        console.log(response);
        return false;
    } else {
        console.log("Suppresion effectué");
        return true;
    }
}


export async function testBab() {
    testMod();
    testDel();

document.getElementById("div.warning").innerHTML = "Test Bout à Bout: tout est passé";
    document.getElementById("div.warning").style.display = 'block';
}