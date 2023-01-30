const btnUpdate = document.querySelector(".btn-update");

async function getTaskById(id) {
  await fetch(`http://localhost:3000/taches/${id}`)
    .then((res) => res.json())
    .then((task) => console.log(task));
}

btnUpdate.addEventListener("click", function () {
  getTaskById(1);
});
