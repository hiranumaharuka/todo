import { TodoService } from './../../services/todo.service';
import { Todo } from './../../models/todo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  editTodo: Todo;
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  setClasses(): any {
    const classes = {
      todo: true,
      'is-completed': this.todo.completed,
    };
    return classes;
  }

  toggle(todo: Todo): void {
    todo.completed = !this.todo.completed;
    this.todoService.toggleComplete(todo);
  }

  delete(todo: Todo): void {
    this.deleteTodo.emit(todo);
  }

  edit(todo: Todo): void {
    this.editTodo = todo;
  }

  update(): void {
    if (this.editTodo) {
      this.todoService.updateTodo(this.editTodo);
      this.editTodo = undefined;
    }
  }
}
