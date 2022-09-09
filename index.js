function drag(event) {
  event.dataTransfer.setData('text', event.target.id)
}

function allowDrop(event) {
  event.preventDefault()

  if (event.target.classList.contains('list')) {
    event.target.classList.add('list-hover')
  }
}

function drop(event) {
  event.preventDefault()
  
  const data = event.dataTransfer.getData('text')
  event.currentTarget.appendChild(document.getElementById(data))

  if (event.target.classList.contains('list-hover')) {
    event.target.classList.remove('list-hover')
  }
}

function handleShowModal() {
  const overlay = document.getElementById('overlay')

  if (overlay.style.display === 'none') {
    overlay.style.display = 'flex'
  } else {
    overlay.style.display = 'none'
  }
}

function handleCloseModal(e) {
  if (e.target.contains('overlay') && !! e.target.contains(form)) {
    handleShowModal()
  }
}

function handleList(initialStatus) {
  if (initialStatus === 'todo') return document.getElementById('list-todo')
  if (initialStatus === 'doing') return document.getElementById('list-doing')
  if (initialStatus === 'done') return document.getElementById('list-done')

  return document.getElementById('list-todo')
}

function handleCreateTask() {
  const title = document.getElementById('task-name').value
  const label = document.getElementById('task-label').value
  const initialStatus = document.getElementById('task-status').value
  const description = document.getElementById('task-description').value

  const list = handleList(initialStatus)

  if (title && description && initialStatus && label) {
    list.innerHTML += `
      <li class='task' id='${Math.random().toString(36)}' draggable='true' ondragstart='drag(event)'>
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
  const toast = document.getElementById('toast-list')

  if (status === 'success') {
    toast.innerHTML += `
      <li class='toast success'>
          <span class='toast-title'>Ação concluída!</span>
          <span class='toast-description'>Nova tarefa cadastrada.</span>
      </li>
    `
  } else {
    toast.innerHTML += `
      <li class='toast error'>
          <span class='toast-title'>Tivemos um problema!</span>
          <span class='toast-description'>Preencha todos os campos.</span>
      </li>
    `
  }

  setTimeout(() => toast.innerHTML = '', 7500)
}