function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id)
}

function allowDrop(ev) {
  ev.preventDefault()
}

function drop(ev) {
  ev.preventDefault()

  const data = ev.dataTransfer.getData("text")

  ev.currentTarget.appendChild(document.getElementById(data))
}

function handleShowModal() {
  const overlay = document.getElementById("overlay")

  if (overlay.style.display === "none") {
    overlay.style.display = "flex"
  } else {
    overlay.style.display = "none"
  }
}

function handleCloseModal(e) {
  if (e.target.contains('overlay') && !! e.target.contains(form)) {
    handleShowModal()
  }
}

function handleList(initialStatus) {
  const listTodo = document.getElementById("list-todo")
  const listDoing = document.getElementById("list-doing")
  const listDone = document.getElementById("list-done")

  if (initialStatus === 'todo') return listTodo
  if (initialStatus === 'doing') return listDoing
  if (initialStatus === 'done') return listDone

  return listTodo
}

function handleCreateTask() {
  const title = document.getElementById("task-name").value
  const label = document.getElementById("task-label").value
  const initialStatus = document.getElementById("task-status").value
  const description = document.getElementById("task-description").value

  const list = handleList(initialStatus)

  if (title && description && initialStatus && label) {
    list.innerHTML += `
      <li class="task" id="${title.toLowerCase().split(" ").join("")}" draggable="true" ondragstart="drag(event)">
          <span class='label ${label}'>${label}</span>
          <span>${title}</span>
          <span>${description}</span>
      </li>
    `

    handleToast('success')

  } else handleToast('error')

  handleShowModal()
}

function handleToast(status) {
  const toast = document.getElementById("toast-list")

  if (status === 'success') {
    toast.innerHTML += `
      <li class="toast success">
          <span class='toast-title'>Ação concluída!</span>
          <span class='toast-description'>Nova tarefa cadastrada.</span>
      </li>
    `
  } else {
    toast.innerHTML += `
      <li class="toast error">
          <span class='toast-title'>Tivemos um problema!</span>
          <span class='toast-description'>Preencha todos os campos.</span>
      </li>
    `
  }

  setTimeout(() => toast.innerHTML = '', 7500)
}