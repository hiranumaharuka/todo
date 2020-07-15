import { TodoService } from './../../services/todo.service';
import { Todo } from './../../models/todo';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit, OnDestroy {
  todos: Todo[];
  sub: Subscription;
  constructor(private todoService: TodoService) {}
  ngOnInit(): void {
    this.sub = this.todoService
      .getTodos()
      .subscribe((todos) => (this.todos = todos));
  }

  deleteTodo(todo: Todo): void {
    const targetIndex = this.todos.findIndex((todos) => todos.id === todo.id);
    this.todos.splice(targetIndex, 1);
    this.todoService.deleteTodo(todo);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
