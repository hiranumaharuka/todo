import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  title: string;
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  submit(form: FormGroupDirective): void {
    const todo = {
      title: this.title,
      completed: false,
    };
    this.todoService.addTodo(todo);
    form.resetForm();
  }
}
