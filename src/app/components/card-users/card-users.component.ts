import { Component, inject, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { ICON } from 'src/assets/icon';
import Swal from 'sweetalert2';
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
    this.confirm(id, firstname, lastname);
  }

  confirm(id: string, firstname: String, lastname: string) {
    Swal.fire({
      title: `Estás seguro que deseas borrar el usuario ${firstname} ${lastname}?`,
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar usuario',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await this.userService.deleteById(id);
        console.log(response);
        Swal.fire({
          title: 'Borrado!',
          text: 'El usuario ha sido  borrado',
          icon: 'success',
        });
      }
    });
  }
}
