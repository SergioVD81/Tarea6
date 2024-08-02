import { User } from '../interfaces/user.interface';
import Swal from 'sweetalert2';

export function dialogBox(message: string): void {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
}

export function confirm(
  response: User,
  firstname: String,
  lastname: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!response.id) reject(new Error('No existe el usuario'));
    Swal.fire({
      title: `Estás seguro que deseas borrar el usuario ${firstname} ${lastname}?`,
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar usuario',
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(
          Swal.fire({
            title: 'Borrado!',
            text: 'El usuario ha sido  borrado',
            icon: 'success',
          })
        );
      }
    });
  });
}
