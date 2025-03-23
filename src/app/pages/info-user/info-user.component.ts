import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/i-response.interface';
import { UsersService } from '../../services/users.service';
import { RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-info-user',
  imports: [RouterLink],
  templateUrl: './info-user.component.html',
  styleUrl: './info-user.component.css'
})
export class InfoUserComponent {
@Input() _idUser: string = '';
elUsuario: IUser = {
  _id: '',
  id: 0,
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  image: '',
  password: ''
};
personajesServices= inject(UsersService)
  async ngOnInit(){
    const _id = this._idUser
    try {
      this.elUsuario = await this.personajesServices.getById(_id)
      console.log(this.elUsuario) 
    } catch (error) {
      console.log(error)
    }
  }
  deleteUser(_id: string) {
    toast('Esto borrará permanente el usuario',{
      action: {
        label: 'Borrar',
        onClick: async () => {
          let response = await this.personajesServices.deleteUser(_id).then(() => {
            toast.success(`El usuario ${this.elUsuario.first_name} ${this.elUsuario.last_name} ha sido borrado`)
            setTimeout(() => {
              window.location.href = '/home';
            }, 2000);
          })
        },
      }
    });
    //toast.warning(`¿Desea borrar al usuario ${this.elUsuario.first_name} ${this.elUsuario.last_name}?`);
  }
}


 