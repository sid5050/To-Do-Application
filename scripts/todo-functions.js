//Read existing ToDos from LocalStorage
const getSavedTodos = function () {
    const todosJSON = localStorage.getItem('todos')
    try{
        if (todosJSON != null) {
            return JSON.parse(todosJSON)
        }
        else
            return []
    }
    catch(e)
    {
        return []
    }
}



//Save todos to local storage
const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

//Remove Todo from List
const removeTodo = function (id) {
    const todoIndex = todos.findIndex(function (todo) {
        return todo.id === id
    })
    if(todoIndex>-1)
    {
        todos.splice(todoIndex,1)
    }
}

//See checkbox state and make changes to todo element accordingly
const toggleTodo = function (id) {
    const todo = todos.find(function (todo) {
        return todo.id === id
    })
    if(todo != undefined)
    {
        todo.completed = !todo.completed
    }
}


//Generate Todo element using DOM
const generateTodoDOM = function (todo) {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removebutton = document.createElement('button')
    //set up todo checkbox
    checkbox.setAttribute('type','checkbox')
    checkbox.checked = todo.completed
    checkbox.addEventListener('click',function () {
        toggleTodo(todo.id)
        saveTodos(todos)
        rendervalues(todos,filters)
    })
    containerEl.appendChild(checkbox)

    //set todoText content
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)


    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    //set up the remove button
    removebutton.textContent = 'Remove'
    removebutton.classList.add('button','button--text')
    todoEl.appendChild(removebutton)

    removebutton.addEventListener('click',function () {
        removeTodo(todo.id)
        saveTodos(todos)
        rendervalues(todos,filters)
    })

    return todoEl
}



//Show summary regarding incomplete todos
const showSummary = function (incompletetodos) {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    const plural = incompletetodos.length === 1 ? '' : 's'
    summary.textContent = `You have ${incompletetodos.length} todo${plural} left`
    document.querySelector('#todos').appendChild(summary)
}



//Render todo Application
const rendervalues = function (todos, filters) {
    let renderfn = todos.filter(function (todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    renderfn = renderfn.filter(function (todo) {
        // debugger
        if (filters.hideCompleted) {
            return !todo.completed
        }
        else {
            return true
        }
    })
    const incompletetodos = renderfn.filter(function (todo) {
        return !(todo.completed)
    })
    document.querySelector('#todos').innerHTML = ''

    showSummary(incompletetodos)

    if(renderfn.length > 0){
        renderfn.forEach(function (todo) {
            const pg = generateTodoDOM(todo)
            document.querySelector('#todos').appendChild(pg)
        })
    } else{
        const messageEl = document.createElement('p')
        messageEl.textContent = 'No to-dos to show'
        messageEl.classList.add('empty-message')
        document.querySelector('#todos').appendChild(messageEl)
    }
}