import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  userIsAuthenticated: boolean = false;
  private authListenerSubs!: Subscription; // toDo why is the ! necessary here?  error TS2564

  constructor(private authService: AuthService) {}

  ngOnInit() {
    /* 
      First check to see if user is already authenticated (like if refresh was clicked or 
      they came back while duration was still less than expiration date) because there is a 
      chance it was evaluated in App Component before this code runs.
    */
    this.userIsAuthenticated = this.authService.getIsAuth();
    /*
      Otherwise, subscribe to the authStatusListener to see if user is authenticated
    */
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        console.log(
          'navbar component: userIsAuthenticated is now',
          this.userIsAuthenticated
        );
      });
  }

  logOut() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
