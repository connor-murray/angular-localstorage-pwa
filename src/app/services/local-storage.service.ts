import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() {
  }

  public setItem(key: string, item: any): void {
    localStorage.setItem(key, JSON.stringify(item));
  }

  public getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }
}
