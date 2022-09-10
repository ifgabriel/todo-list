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

function handleList(initialStatus) {
  if (initialStatus === 'todo') return document.getElementById('list-todo')
  if (initialStatus === 'doing') return document.getElementById('list-doing')
  if (initialStatus === 'done') return document.getElementById('list-done')

  return document.getElementById('list-todo')
}


function handleValidation(inputs) {
  const isInvalid = false

  Array.from(inputs).forEach((input) => {
    const isInvalid = input.value.length < 1
  })

  return isInvalid  
}

function handleCreateTask(event) {
  event.preventDefault();

  const title = document.getElementById('task-name').value
  const label = document.getElementById('task-label').value
  const initialStatus = document.getElementById('task-status').value
  const description = document.getElementById('task-description').value
  const inputs = document.getElementById('modal-form').elements
  const list = handleList(initialStatus)

  Array.from(inputs).forEach((input, index) => {
    const isInvalid = input.value.length < 1

    input.setAttribute('aria-invalid', isInvalid)
    
    if(isInvalid && index <= 2) {
      const responseElement = document.getElementById(`${input.id}-response`)

      responseElement.innerHTML = 'Campo obrigatório!'
      responseElement.classList.add('response-error')
    }
  })

  if (title && description && initialStatus && label) {
    list.innerHTML += `
      <li class='task' id='${Math.random().toString(36)}' draggable='true' ondragstart='drag(event)'>
          <span class='label ${label}'>${label}</span>
          <span>${title}</span>
          <span>${description}</span>
      </li>
    `

    handleToast('success')
    handleShowModal()
  }
}

function handleChange(event) {
  const input = event.target
  const isInvalid = input.getAttribute('aria-invalid') === 'true'
  
  if (isInvalid) {
    const responseElement = document.getElementById(`${input.id}-response`)

    input.setAttribute('aria-invalid', false)

    responseElement.innerHTML = 'Preencha o campo'
    responseElement.classList.remove('response-error')
  }
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
  }

  setTimeout(() => toast.innerHTML = '', 7500)
}