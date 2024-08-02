import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { ICON } from 'src/assets/icon';
import { confirm } from '../../helpers/popUp';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
})
export class ViewUserComponent {
  private userSrevice = inject(UsersService);
  private activedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  user: User | any;
  private imgTrash: string = ICON.trash;
  private update: string = ICON.update;
  private magnifying_glass: string = ICON.magnifying_glass;

  constructor() {}

  getImageTrash(): string {
    return this.imgTrash;
  }
  getImageUpdate(): string {
    return this.update;
  }
  getImageGlass(): string {
    return this.magnifying_glass;
  }
  ngOnInit() {
    this.activedRoute.params.subscribe(async (params: any) => {
      let iduser: string = params.iduser;
      try {
        this.user = await this.userSrevice.getById(iduser);
      } catch (error) {
        console.error(error);
      }
    });
  }

  async deleteUser(id: string, firstname: String, lastname: string) {
    try {
      const response = await this.userSrevice.deleteById(id);
      await confirm(this.user, firstname, lastname);

      if (response.id) {
        this.router.navigate(['/']);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
