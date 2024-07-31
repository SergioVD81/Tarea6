import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  formUser!: FormGroup;
  private userService = inject(UsersService);
  private activedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private user!: User;
  private txtTitle: string = 'NUEVO USUARIO';
  private btnText: string = 'Guardar';

  constructor() {
    this.formUser = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ]),
        imageUser: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/
          ),
        ]),
      },
      []
    );
  }

  ngOnInit() {
    this.activedRoute.params.subscribe((params: any) => {
      let idUser: string = params.iduser;
      console.log(idUser);

      if (idUser === undefined) {
        this.txtTitle = 'NUEVO USUARIO';
        this.btnText = 'Guardar';
        this.formUser = new FormGroup(
          {
            id: new FormControl('', []),
            _id: new FormControl('', []),
            name: new FormControl('', [
              Validators.required,
              Validators.minLength(3),
            ]),
            lastName: new FormControl('', [
              Validators.required,
              Validators.minLength(3),
            ]),
            email: new FormControl('', [
              Validators.required,
              Validators.pattern(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
              ),
            ]),
            imageUser: new FormControl('', [
              Validators.required,
              Validators.pattern(
                /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/
              ),
            ]),
          },
          []
        );
      } else {
        this.userService.getById(idUser).subscribe((data) => {
          this.user = data;
          this.formUser = new FormGroup(
            {
              id: new FormControl(this.user.id, []),
              _id: new FormControl(this.user._id, []),
              name: new FormControl(this.user.first_name, [
                Validators.required,
                Validators.minLength(3),
              ]),
              lastName: new FormControl(this.user.last_name, [
                Validators.required,
                Validators.minLength(3),
              ]),
              email: new FormControl(this.user.email, [
                Validators.required,
                Validators.pattern(
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                ),
              ]),
              imageUser: new FormControl(this.user.image, [
                Validators.required,
                Validators.pattern(
                  /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/
                ),
              ]),
            },
            []
          );
        });
        this.txtTitle = 'ACTUALIZAR USUARIO';
        this.btnText = 'Actualizar';
      }
    });
  }

  checkoutForm(field: string, value: string): boolean {
    return this.formUser.get(field)?.hasError(value) &&
      this.formUser.get(field)?.touched
      ? true
      : false;
  }

  async getDataForm() {
    if (this.btnText === 'Guardar') {
      try {
        const response = await this.userService.createNewUsert(
          this.formUser.value
        );
        if (response.id) {
          let message: string = 'El usuario se ha guardado correctamente';
          this.dialogBox(message);
          this.formUser.reset();
          this.router.navigate(['/']);
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        console.log(this.formUser.value._id);
        const response = await this.userService.updateUser(
          this.formUser.value._id,
          this.formUser.value
        );
        if (response.id) {
          let message: string = 'El usuario se ha actualizado correctamente';
          this.dialogBox(message);

          this.router.navigate(['/']);
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }
  getTitle(): string {
    return this.txtTitle;
  }
  getTextBtn(): string {
    return this.btnText;
  }
  dialogBox(message: string): void {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
