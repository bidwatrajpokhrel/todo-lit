import { LitElement, html } from "@polymer/lit-element";

class ToDoItem {
  constructor(todo, status) {
    this.todo = todo;
    this.status = status;
  }
}

export class AppTodo extends LitElement {
  constructor() {
    super();
    this.todoItems = [
      new ToDoItem("Buy Groceries", false),
      new ToDoItem("Make a ToDo app", true),
      new ToDoItem("Attend the meeting :)", false),
    ];
    this.hideDone = false;
    this.input;
  }
  updated() {
    this.input = this.shadowRoot.getElementById("add-new");
  }
  static get properties() {
    return {
      todoItems: { type: Array },
      hideDone: { type: Boolean },
    };
  }

  render() {
    const css = html`
      <style>
        h1 {
          color: #f0dc9a;
        }
        ul {
          list-style-type: none;
        }

        .done {
          text-decoration-line: line-through;
          color: #818181;
        }
      </style>
    `;

    const filteredItems = this.hideDone
      ? this.todoItems.filter((item) => !item.status)
      : this.todoItems;

    return html`
      ${css}
      <h1>Todo:</h1>
      <div class="list-area">
        <div class="add-item-area">
          <input id="add-new" type="text" />
          <button @click=${this.addItem}>Add Item</button>
        </div>
        <ul>
          ${filteredItems.map(
            (item) =>
              html` <li><button @click=${() =>
                this.deleteItem(item)}>Delete</button>
              <input
                @change=${() => this.toggleCompleted(item)}
                ?checked=${item.status}
                type="checkbox"
              /><span class=${item.status ? "done" : "not-done"}>${
                item.todo
              }<span>
            </li>`
          )}
        </ul>
      </div>
      <div>
        <input
          @change=${() => {
            this.toggleHideDone();
          }}
          ?checked=${this.hideDone}
          type="checkbox"
        />
        Hide Completed Items
      </div>
    `;
  }

  toggleHideDone() {
    this.hideDone = !this.hideDone;
    this.requestUpdate();
  }

  toggleCompleted(item) {
    item.status = !item.status;
    this.requestUpdate();
  }

  addItem() {
    if (!!this.input.value) {
      this.todoItems.push(new ToDoItem(this.input.value, false));
      this.input.value = "";
      this.requestUpdate();
    }
  }

  deleteItem(item) {
    this.todoItems.splice(item, 1);
    this.requestUpdate();
  }
}

window.customElements.define("app-todo", AppTodo);
