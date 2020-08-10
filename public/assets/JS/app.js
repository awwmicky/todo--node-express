const $todoForm = document.forms["todo_form"];
const $taskInp = document.forms["todo_form"].task_inp;
const $submitBtn = document.forms["todo_form"].submit_btn;
const $todoList = document.querySelector('.todo-list');


(() => (
    axios.get('/api/view-all-tasks')
    .then(res => renderData(res.data))
    .catch(err => console.log(err))
))()


const empty = (elm) => elm.innerHTML = "";

function appendDOM (elm,idx) {
    const checked = (elm.completed) ? 'task-completed' : '';
    const completed = (elm.completed) ? 'checked' : '';
    
    $todoList.insertAdjacentHTML(
        'beforeend',
        `
        <div class="task-card" data-id="${ idx }">
            <div class="task-check">
                <input 
                    type="checkbox" 
                    name="check" 
                    id="${ 'check-box-'+idx }"
                    class="check-box"
                    ${ completed }
                />
                <label 
                    for="${ 'check-box-'+idx }" 
                    class="check-mark"
                ></label>
            </div>
            <p class="task-title ${ checked }" contenteditable>
                <span>${ elm.task }</span>
            </p>
            <div class="task-opts">
                <button class="edit-btn">✎</button>
                <button class="delete-btn">×</button>
            </div>
        </div>
        `
    )
}

function renderData (data) {
    // console.log(data)
    if (data instanceof Array) {
        console.log('Array:', data)
        empty($todoList)
        data.map(appendDOM)
        return;
    }
    if (data instanceof Object) {
        console.log('Object:', data)
        appendDOM(data,"___")
        return;
    }
}

$todoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const input = $taskInp.value.trim();
    if (input === "") return;

    const data = { task : input };

    axios.post('/api/create-task', data)
    .then(res => {
        // console.log(res.data)
        $todoForm.reset()
        renderData(res.data)
    })
    .catch(err => console.log(err))
})

function completeTask (e) {
    const card = e.target.parentElement.parentElement;
    const isChecked = e.target.previousElementSibling.checked;
    const id = card.dataset.id;
    console.log(card,id,isChecked)
    // TodoDB.updateData(id,isChecked)
    const text = card.querySelector('.task-title');
    text.classList.toggle('task-completed')
}
function editTask (e) {
    const card = e.target.parentElement.parentElement;
    const text = card.querySelector('.task-title').textContent.trim();
    const id = card.dataset.id;
    console.log(card,id,text)
    // TodoDB.updateData(id,text)
}
function deleteTask (e) {
    const card = e.target.parentElement.parentElement;
    const id = card.dataset.id;
    console.log(card,id)
    // TodoDB.removeData(id)
    card.parentElement.removeChild(card)
}

$todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('check-mark')) {
        // console.dir(e.target)
        completeTask(e)
        return;
    }
    if (e.target.classList.contains('edit-btn')) {
        // console.dir(e.target)
        editTask(e)
        return;
    }
    if (e.target.classList.contains('delete-btn')) {
        // console.dir(e.target)
        deleteTask(e)
        return;
    }
})