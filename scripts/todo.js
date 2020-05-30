console.log("In todo application")

let todos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}


rendervalues(todos,filters)


document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    rendervalues(todos,filters)
})

document.querySelector('#new-todo').addEventListener('submit',function (e) {
    e.preventDefault()
    const data = e.target.elements.text.value.trim()
    if(data.length > 0){
        todos.push({
            id: uuidv4(),
            text: data,
            completed: false
        })
        saveTodos(todos)
        rendervalues(todos,filters)
        e.target.elements.text.value = ''
    }
})


document.querySelector('#hide').addEventListener('change',function (e) {
    console.log(e.target.checked)
    filters.hideCompleted = e.target.checked
    rendervalues(todos,filters)
})