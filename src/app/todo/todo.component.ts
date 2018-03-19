import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoService} from '../services/todo.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {

  title: string;
  description: string;
  todos: Todo[];

  private todoSubscription: Subscription;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.todoSubscription = this.todoService.todos$.subscribe((todos: Todo[]) => {
      this.todos = todos;
    });
  }

  ngOnDestroy(): void {
    this.todoSubscription.unsubscribe();
  }

  add(): void {
    this.todoService.add({title: this.title, description: this.description});
    this.reset();
  }

  remove(todo: Todo): void {
    this.todoService.remove({title: todo.title, description: todo.description});
  }

  private reset(): void {
    this.title = null;
    this.description = null;
  }
}
