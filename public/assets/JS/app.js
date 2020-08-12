const $todoForm = document.forms["todo_form"];
const $taskInp = document.forms["todo_form"].task_inp;
const $todoList = document.querySelector('.todo-list');


(() => (
    axios.get('/api/view-all-tasks')
    .then(res => renderData(res.data))
    .catch(err => console.log(err))
))()


const emptyHTML = (elm) => elm.innerHTML = "";
const toggleAttr = (elm) => (
    (elm.hasAttribute('disabled')) ?
    elm.removeAttribute('disabled') :
    elm.setAttribute('disabled', "") 
);

function appendTaskItem (elm,idx) {
    const checked = (elm.completed) ? 'checked' : '';
    
    $todoList.insertAdjacentHTML(
        'beforeend',
        `
        <div class="task-card" data-id="${ idx }" data-key="${ elm.id }">
            <div class="task-check-box">
                <input
                    type="checkbox" 
                    name="check" 
                    id="${ 'check-box-'+idx }"
                    class="check-box"
                    ${ checked }
                />
                <label
                    for="${ 'check-box-'+idx }"
                    class="check-mark task-header"
                >${ elm.task }</label>
            </div>
            <div class="task-opts">
                <button class="btn edit-btn">✎</button>
                <button class="btn delete-btn">×</button>
            </div>
        </div>
        `
    )
}

function renderData (data) {
    // console.log(data)
    if (data instanceof Array) {
        console.log('Array:', data)
        emptyHTML($todoList)
        data.map(appendTaskItem)
        return;
    }
    if (data instanceof Object) {
        console.log('Object:', data)
        appendTaskItem(data, data.id)
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
    const key = card.dataset.key;
    
    // console.log( card,key,isChecked )
    const data = { completed : isChecked };
    axios.patch(`/api/adjust-task/${key}`, data)
    .then(res => {
        // console.log(res.data)
    })
    .catch(err => console.log(err))
}
function editTask (e) {
    const card = e.target.parentElement.parentElement;
    const key = card.dataset.key;

    // console.log( card,key )
    axios.get(`/api/view-one-task/${key}`)
    .then(res => {
        // console.log(res.data)
        toggleAttr( $todoForm.submit_post )
        appendTaskForm(res.data)
    })
    .catch(err => console.log(err))
}
function deleteTask (e) {
    const card = e.target.parentElement.parentElement;
    const key = card.dataset.key;

    // console.log(card,key)
    axios.delete(`/api/remove-task/${key}`)
    .then(res => {
        // console.log(res.data)
        card.parentElement.removeChild(card)
    })
    .catch(err => console.log(err))
}

$todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('check-mark')) return completeTask(e);
    if (e.target.classList.contains('edit-btn')) return editTask(e);
    if (e.target.classList.contains('delete-btn')) return deleteTask(e);
})

function appendTaskForm (data) {
    emptyHTML($todoList)
    const description = (data.notes) ? data.notes : "";
    const checked = (data.completed) ? 'checked' : "";

    $todoList.insertAdjacentHTML(
        'beforeend',
        `
        <form name="task_form" class="task-form" data-key="${ data.id }">
            <input 
                type="text"
                name="task_title"
                id="task-title"
                class="task-title"
                placeholder="Title"
                autocomplete="off"
                value="${ data.task }"
            />
            <textarea
                name="task_desc" 
                id="task-desc"
                class="task-desc"
                placeholder="Description"
                autocomplete="off"
            >${ description }</textarea>
            <div class="menu-opts">
                <button 
                    type="submit"
                    names="submit_update"
                    id="submit-update"
                    class="btn submit-update"
                >✱</button>
                <div class="btn checker">
                    <input 
                        type="checkbox" 
                        name="check" 
                        id="check-box"
                        class="check-box"
                        ${ checked }
                    />
                    <label 
                        for="check-box"
                        class="task-mark"
                    ></label>
                </div>
                <button 
                    type="button"
                    name="task_delete"
                    id="task-delete"
                    class="btn task-delete"
                >🗑</button>
            </div>
        </form>
        `
    )    
}

$todoList.addEventListener('click', (e) => {
    if ( !document.forms["task_form"] ) return;

    const $taskForm = document.forms["task_form"];
    const $taskTitle = document.forms["task_form"].task_title;
    const $taskDesc = document.forms["task_form"].task_desc;
    const $taskMark = document.forms["task_form"].check;
    const $deleteTask = document.forms["task_form"].task_delete;

    if ( e.target.classList.contains('submit-update') ) {
        $taskForm.addEventListener('submit', (_e) => {
            _e.preventDefault()
            
            const key = $taskForm.dataset.key;
            const data = {
                task: $taskTitle.value.trim(),
                notes: $taskDesc.value.trim(),
                completed: $taskMark.checked
            };

            // console.log( key,data )
            axios.put(`/api/update-task/${ key }`, data)
            .then(res => {
                // console.log(res.data)
                toggleAttr( $todoForm.submit_post )
                renderData(res.data)
            })
            .catch(err => console.log(err))
        })
        return;
    }

    if ( e.target.classList.contains('task-delete') ) {
        $deleteTask.addEventListener('click', (_e) => {

            const key = $taskForm.dataset.key;
            axios.delete(`/api/remove-task/${ key }`)
            .then(res => {
                // console.log(res.data)
                toggleAttr( $todoForm.submit_post )
                renderData(res.data)
            })
            .catch(err => console.log(err))
        })
        return;
    }
})