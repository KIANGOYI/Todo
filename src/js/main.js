const btnUpdate = document.querySelector(".btn-update");
const btnDelete = document.querySelector(".btn-delete");
const input = document.getElementById("input");

async function updateTask(id) {
  let title = "json-server Brice";
  const res = await fetch("http://localhost:3000/taches/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ title }),
  });
}

btnUpdate.addEventListener("click", function () {
  updateTask(3);
});

btnDelete.addEventListener("click", function () {
  deleteTask(1);
});

/**
 * Delete a task
 * @param {number} taskId
 * @returns
 */

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

// test
