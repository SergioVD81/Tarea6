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
  pag: number = 1;
  constructor() {}

  ngOnInit() {
    this.userService.getAll(this.pag).subscribe((data) => {
      this.arrayUser = data.results;
      console.log(this.arrayUser);
    });
  }
  getArrayUser(): User[] {
    return this.arrayUser;
  }
  pagination($event: any) {
    console.log($event.target.textContent);
    if (
      $event.target.textContent == 'Previous' &&
      this.pag > 1 &&
      this.pag > 0
    ) {
      this.pag--;
      this.userService.getAll(this.pag).subscribe((data) => {
        this.arrayUser = data.results;
        console.log(this.arrayUser);
      });
    } else if (
      $event.target.textContent == 'Next' &&
      this.pag === 1 &&
      this.pag < 3
    ) {
      this.pag++;
      this.userService.getAll(this.pag).subscribe((data) => {
        this.arrayUser = data.results;
        console.log(this.arrayUser);
      });
    }
  }
}
