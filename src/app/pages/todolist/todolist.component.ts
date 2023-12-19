import {Component, signal} from '@angular/core';
import {JsonPipe, NgClass} from "@angular/common";
type ToDo = { id: number, label: string, completed: boolean }
const initial: ToDo[] = [
  { id: 1, label: 'spesa', completed: false },
  { id: 2, label: 'bollette', completed: true },
  { id: 3, label: 'dog sitter', completed: false },
  { id: 4, label: 'lavaggio auto', completed: true },

]
@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [
    JsonPipe,
    NgClass
  ],
  template: `
      <div class="flex flex-col gap-2">
        <input
                type="text"
                class="border border-1 dark:border-white border-slate-400 rounded-xl bg-white w-full p-2"
                placeholder="Aggiungi una nuova voce e premi invio"
                #input
                (keydown.enter)="add(input)"
        />
        @for (todo of todoList(); track todo.id){
          <div class="border border-1 rounded-2xl border-white p-2 flex justify-between items-center dark:bg-slate-900 bg-slate-200">
              <div class="form-control">
                  <label class="label cursor-pointer">
                      <input type="checkbox"
                             [checked]="todo.completed"
                             class="checkbox"
                             [ngClass]="todo.completed ? 'checkbox-success' : 'checkbox-error'"
                             (change)="check(todo)"/>
                  </label>
              </div>
              <div [ngClass]="todo.completed ? 'line-through text-success': 'text-black dark:text-slate-300'">{{todo.label}}</div>
              <div>
                  <button class="bg-red-700 text-white rounded-xl btn-sm" (click)="remove(todo)">RIMUOVI</button>
              </div>
          </div>
        } @empty {
            <div class="dark:text-white text-slate-900 text-center p-2 border border-1 border-dotted dark:border-white border-slate-400 rounded-xl">Nessuna voce inserita</div>
        }
      </div>
  `,
  styles: ``
})
export default class TodolistComponent {
  todoList = signal<ToDo[]>(initial)
  remove(todo: ToDo){
    this.todoList.set(
      this.todoList().filter(t => t.id !==todo.id)
    )
  }
  check(todo: ToDo){
    this.todoList.update(todoes => todoes.map(t => {
      return t.id === todo.id ? {...t, completed: !t.completed} : t
    }))
  }
  add(e: HTMLInputElement){
    if(e.value.length>0) {
      const todoNew: ToDo = {
        id: new Date().getTime(),
        completed: false,
        label: e.value
      }
      this.todoList.set([...this.todoList(), todoNew])
      e.value = '';
    }

  }
}
