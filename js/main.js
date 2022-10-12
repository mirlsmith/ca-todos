'use strict'

function onInit() {
    renderTodos()
}

function renderTodos() {

    const todos = getTodosForDisplay()

    _checkNothingToDisplay(todos)
   
    const strHTMLs = todos.map(todo => `
        <li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
            ${todo.txt}
            <button onclick="onRemoveTodo(event,'${todo.id}')" >X</button>
        </li>
    `)

    document.querySelector('ul').innerHTML = strHTMLs.join('')
    document.querySelector('span.total').innerText = getTotalCount()
    document.querySelector('span.active').innerText = getActiveCount()
}

function _checkNothingToDisplay(todos){
    if (!todos.length){
        if (!getTotalCount()) document.querySelector('.no-todos').innerText = 'No Todos'
        else if (!getActiveCount()) document.querySelector('.no-todos').innerText = 'No Active Todos'
            else if (!getDoneCount()) document.querySelector('.no-todos').innerText = 'No Done Todos'        
        document.querySelector('.no-todos').hidden = false
    } else document.querySelector('.no-todos').hidden = true
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    if (confirm('Do you really want to delete??')){
        removeTodo(todoId)
        renderTodos()
    }
}

function onToggleTodo(todoId) {
    toggleTodo(todoId)
    renderTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('[name=txt]')
    const txt = elTxt.value
    if (!txt.trim()) {
        alert('Please add name of your To Do')
        return
    }

    var radioBtnChoice = _getImportanceChoice()
    
    addTodo(txt, radioBtnChoice)
    renderTodos()
    elTxt.value = ''
}

function _getImportanceChoice() {
    const elRadioBtns = document.querySelectorAll('input[name="imp-choice"]')
    var choice
    for (const elRadioBtn of elRadioBtns) {
        if (elRadioBtn.checked) {
            choice = +elRadioBtn.value;
            break;
        }
    }
    return choice
}

function onSetFilter(filterBy) {
    setFilter(filterBy)
    renderTodos()
}

function onSetFilterByTxt(txt) {
    setFilterByTxt(txt)
    renderTodos()
}

function onSetSort(sortBy){
    setSort(sortBy)
    renderTodos()
}
