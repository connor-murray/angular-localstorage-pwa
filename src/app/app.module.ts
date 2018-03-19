import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule,
  MatSnackBarModule
} from '@angular/material';
import {TodoComponent} from './todo/todo.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from "@angular/forms";
import {TodoService} from "./services/todo.service";
import {LocalStorageService} from "./services/local-storage.service";

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [TodoService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
