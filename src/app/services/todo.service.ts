import { Todo } from './../models/todo';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private db: AngularFirestore) {}

  getTodos(): Observable<Todo[]> {
    return this.db.collection<Todo>(`todos`).valueChanges();
  }

  toggleComplete(todo: Todo): Promise<void> {
    return this.db
      .doc(`todos/${todo.id}`)
      .update({ completed: todo.completed });
  }

  deleteTodo(todo: Todo): Promise<void> {
    return this.db.doc(`todos/${todo.id}`).delete();
  }

  addTodo(todo: Omit<Todo, 'id'>): Promise<void> {
    const id = this.db.createId();
    return this.db.doc(`todos/${id}`).set({
      id,
      ...todo,
    });
  }

  updateTodo(todo): Promise<void> {
    return this.db.doc(`todos/${todo.id}`).update({ ...todo });
  }
}
