import { Component, inject, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { ICON } from 'src/assets/icon';
import { confirm } from '../../helpers/popUp';

@Component({
  selector: 'app-card-users',
  templateUrl: './card-users.component.html',
  styleUrls: ['./card-users.component.css'],
})
export class CardUsersComponent {
  @Input() users!: User;
  private userService = inject(UsersService);
  private imgTrash: string = ICON.trash;
  private update: string = ICON.update;
  private magnifying_glass: string = ICON.magnifying_glass;
  private resp!: User;
  getImageTrash(): string {
    return this.imgTrash;
  }
  getImageUpdate(): string {
    return this.update;
  }
  getImageGlass(): string {
    return this.magnifying_glass;
  }
  async deleteUser(id: string, firstname: String, lastname: string) {
    try {
      this.resp = await this.userService.deleteById(id);
      confirm(this.resp, firstname, lastname);
    } catch (error) {
      console.error(error);
    }
  }
}
