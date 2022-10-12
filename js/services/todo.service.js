'use strict'

const STORAGE_KEY = 'todoDB'
var gFilterBy = {
    txt: '',
    status: ''
}

var gSortBy = 'date-created'

var gTodos

_createTodos()

function getTodosForDisplay() {

    _sortTodos()

    var todos = gTodos

    if (gFilterBy.status) {
        todos = todos.filter(todo =>
            (todo.isDone && gFilterBy.status === 'done') ||
            (!todo.isDone && gFilterBy.status === 'active')
        )
    }
    todos = todos.filter(todo => todo.txt.toLowerCase().includes(gFilterBy.txt.toLowerCase()))

    return todos
}

function _sortTodos() {
    switch (gSortBy) {
        case 'date-created':
            _sortByDate()
            break;
        case 'name':
            _sortByName()
            break;
        case 'importance':
            _sortByImportance()
            break;
    }
}

function _sortByDate() {
    gTodos.sort((a, b) => a.createdAt - b.createdAt)
}

function _sortByName() {
    gTodos.sort((a, b) => {
        if (a.txt.toLowerCase() < b.txt.toLowerCase()) return -1
        if (a.txt.toLowerCase() > b.txt.toLowerCase()) return 1
        return 0
    })
}

function _sortByImportance() {
    gTodos.sort((a, b) => a.importance - b.importance)
}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    _saveTodosToStorage()
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}

function addTodo(txt, imp) {

    const todo = _createTodo(txt, imp)
    gTodos.push(todo)
    _saveTodosToStorage()
}

function setFilter(status) {
    gFilterBy.status = status
}

function setFilterByTxt(txt) {
    gFilterBy.txt = txt
}

function setSort(sortBy) {
    gSortBy = sortBy
}

function getTotalCount() {
    return gTodos.length
}

function getActiveCount() {
    return gTodos.filter(todo => !todo.isDone).length
}

function getDoneCount() {
    return gTodos.filter(todo => todo.isDone).length
}

function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY)

    if (!todos || !todos.length) {
        todos = [
            {
                id: 't101',
                txt: 'Learn HTML',
                isDone: true,
                createdAt: Date.now(),
                importance: 1
            },
            {
                id: 't102',
                txt: 'Master JS',
                isDone: false,
                createdAt: Date.now(),
                importance: 2
            },
            {
                id: 't103',
                txt: 'Study CSS',
                isDone: false,
                createdAt: Date.now(),
                importance: 1
            },
        ]
    }

    gTodos = todos
    _saveTodosToStorage()
}

function _createTodo(txt, importance) {
    const todo = {
        id: _makeId(),
        txt,
        isDone: false,
        createdAt: Date.now(),
        importance
    }
    return todo
}

function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos)
}

function _makeId(length = 5) {
    var txt = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return txt;
}