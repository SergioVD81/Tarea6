import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { form, dialogBox } from 'src/app/helpers/functionsForm';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

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

      if (idUser === undefined) {
        this.txtTitle = 'NUEVO USUARIO';
        this.btnText = 'Guardar';
        this.formUser = form(idUser, this.formUser, this.user);
      } else {
        this.userService.getById(idUser).subscribe((data) => {
          this.user = data;
          this.formUser = form(idUser, this.formUser, this.user);
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
          dialogBox(message);
          this.formUser.reset();
          this.router.navigate(['/']);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await this.userService.updateUser(
          this.formUser.value._id,
          this.formUser.value
        );
        if (response.id) {
          let message: string = 'El usuario se ha actualizado correctamente';
          dialogBox(message);
          this.router.navigate(['/']);
        }
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
}
