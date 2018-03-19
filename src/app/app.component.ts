import {Component, OnDestroy, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {Subscription} from 'rxjs/Subscription';
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private swUpdateAvailableSubscription: Subscription;

  constructor(private swUpdate: SwUpdate, private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.swUpdateAvailableSubscription = this.swUpdate.available.subscribe(() => {
      this.onSwUpdateAvailable();
    });
  }

  ngOnDestroy() {
    this.swUpdateAvailableSubscription.unsubscribe();
  }

  private onSwUpdateAvailable(): void {
    const snack: MatSnackBarRef<SimpleSnackBar> = this.matSnackBar.open('Update Available', 'Reload',
      {duration: 10000}
    );
    snack.onAction().subscribe(() => this.swUpdateVersion());
  }

  private swUpdateVersion(): void {
    this.swUpdate.activateUpdate().then(() => {
      window.location.reload();
    });
  }
}
