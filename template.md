```html
    <section class="todo-list"></section>
```

```html
<form name="task_form" class="task-form" data-key="0110">
    <input 
        type="text"
        name="task_title"
        id="task-title"
        class="task-title"
        placeholder="Title"
        autocomplete="off"
        value="the task title"
    />
    <textarea
        name="task_desc" 
        id="task-desc"
        class="task-desc"
        placeholder="Description"
        autocomplete="off"
    >the task description</textarea>
    <div class="menu-opts">
        <button 
            type="submit"
            names="submit_update"
            id="submit-update"
            class="btn submit-update"
        >✱</button>
        <input 
            type="checkbox" 
            name="check" 
            id="check-box"
            class="check-box"
        />
        <label 
            for="check-box"
            class="btn task-mark"
        ></label>
        <button 
            class="btn task-delete"
        >🗑</button>
    </div>
</form>
```

```css
.task-form {}
.task-title {}
.task-desc {}
.menu-opts {}
.submit-update {}
.check-box {} /* input */
.task-mark {} /* label */
.task-delete {}
```

```html
<div class="task-card" data-id="0" data-key="0110">
    <div class="task-check-box">
        <input
            type="checkbox" 
            name="check" 
            id="check-box-0"
            class="check-box"
            checked
        />
        <label
            for="check-box-0"
            class="check-mark task-header"
        >this is a task</label>
    </div>
    <div class="task-opts">
        <button class="btn edit-btn">✎</button>
        <button class="btn delete-btn">×</button>
    </div>
</div>
```

```css
.task-card {}
.task-check {}
.check-box {} /* input */
.check-mark {} /* label */
.task-title {}
.task-opts > button {}
/*  */
.task-completed { 
    text-decoration: line-through; 
    text-decoration-color: rgba(0,0,0,0.45);
}
```

```json
[
    {
        "id": 10,
        "task": "do something",
        "completed": false
    }
]
```