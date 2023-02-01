export function testUpdate(data) {
  if (
    data.created_at != null ||
    data.updated_at != null ||
    data.id != null ||
    data.title != null ||
    data.status != null
  ) {
    return 0;
  } else {
    return 1;
  }
}

export function testAdd() {
  tache = {
    title: "aube mbali",
    created_at: "01/03/2023",
    status: "pending",
  };

  let retour = addTask(urlHost, tache);
  retour.then((task) => {
    if (task.title == tache.title) {
      console.log(task);
      let tacheUpdate = {
        id: task.id,
        title: "Sah nerisse",
        created_at: "29/01/2023",
        update_at: "31/02/2023",
        status: "fait",
      };
      console.log(testUpdate(tacheUpdate));
      if (testUpdate(tacheUpdate) == 0) {
        console.log("ok");
        updateTask(tacheUpdate.id, tacheUpdate.title);
        //deleteTask(task.id);
      } else {
        let p = document.createElement("p");
        p.innerHTML = `<span class="text-white">Les champs sont obligatoires</span>`;
        p.className = "bg-danger text-center ";
        message.append(p);
      }
    } else {
      console.log(1);
    }
  });
}
