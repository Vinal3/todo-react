const URL = "http://localhost:3001/tasks"

const headers = {
  "Content-Type": "application/json",
}

const serverAPI = {
  getAll: () => {
    return fetch(URL).then((res) => res.json())
  },

  getById: (id) => {
    return fetch(`${URL}/${id}`).then((res) => {
      if (res.ok) return res.json()
      throw new Error("404")
    })
  },

  add: (task) => {
    return fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(task),
    }).then((res) => res.json())
  },

  delete: (id) => {
    return fetch(`${URL}/${id}`, { method: "DELETE" })
  },

  deleteAll: (tasks) => {
    return Promise.all(tasks.map(({ id }) => serverAPI.delete(id)))
  },

  toggleComplete: (id, isDone) => {
    return fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ isDone }),
    })
  },
}

export default serverAPI