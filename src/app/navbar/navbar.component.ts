import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userIsAuthenticated: boolean = false;
  private authListenerSubs!: Subscription;  // toDo why is the ! necessary here?  error TS2564

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      console.log('userIsAuthenticated is now', this.userIsAuthenticated);
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
