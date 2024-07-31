import { Component, inject } from '@angular/core';
import { Data } from '@angular/router';
import { Datas, User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private userService = inject(UsersService);
  private arrayUser: User[] = [];
  private data!: Datas;
  constructor() {}

  ngOnInit() {
    this.userService.getAll(1).subscribe((data) => {
      this.arrayUser = data.results;
    });
  }
  getArrayUser(): User[] {
    return this.arrayUser;
  }
}
