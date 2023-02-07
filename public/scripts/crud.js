
export async function updateTask(id, title) {
    const res = await fetch("http://localhost:3000/taches/" + id, {
      method: "PATCH",
  
      headers: {
        "Content-Type": "application/json",
      },
  
      body: JSON.stringify(title),
    });
    return res.json();
}
  

export async function deleteTask(taskId) {
  
    const options = {
      method: "DELETE",
      headers: new Headers(),
    };
  
    console.log("taskid: " + taskId);
    const response = await fetch("http://localhost:3000/taches/" + taskId, options).then((response) => {
      if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server");
      }
      return response;
      }).then((returnedResponse) => {
         // Your response to manipulate
         location.reload();
         return response.json();
      }).catch((error) => {
        // Your error is here!
        return error;
    });
};

export async function addTask(url = "", data = {}) {
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
