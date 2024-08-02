import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../interfaces/user.interface';

export function form(idUser: string, formUser: FormGroup, user: User) {
  if (idUser === undefined) {
    return (formUser = new FormGroup(
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
    ));
  } else {
    return (formUser = new FormGroup(
      {
        id: new FormControl(user.id, []),
        _id: new FormControl(user._id, []),
        name: new FormControl(user.first_name, [
          Validators.required,
          Validators.minLength(3),
        ]),
        lastName: new FormControl(user.last_name, [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl(user.email, [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ]),
        imageUser: new FormControl(user.image, [
          Validators.required,
          Validators.pattern(
            /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/
          ),
        ]),
      },
      []
    ));
  }
}
