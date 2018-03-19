import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TodoService {

  public todos$: Observable<Todo[]>;

  private todoSubject: BehaviorSubject<Todo[]>;
  private localStorageKey = 'todos';

  constructor(private localStorageService: LocalStorageService) {
    this.todoSubject = new BehaviorSubject(this.localStorageService.getItem(this.localStorageKey) || []);
    this.todos$ = this.todoSubject.asObservable();
  }

  public add(todo: Todo): void {
    const currentTodos: Todo[] = this.todoSubject.getValue();
    currentTodos.push(todo);

    this.update(currentTodos);
  }

  public remove(todo: Todo): void {
    const currentTodos: Todo[] = this.todoSubject.getValue();
    currentTodos.splice(currentTodos.findIndex((item: Todo) => {
      return item.title === todo.title && item.description === todo.description;
    }), 1);

    this.update(currentTodos);
  }

  private update(todos: Todo[]): void {
    this.localStorageService.setItem(this.localStorageKey, todos);
    this.todoSubject.next(todos);
  }
}
