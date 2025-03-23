import { Component, inject, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/i-response.interface';
import { RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
@Input() miUser!: IUser;
personajesServices= inject(UsersService)
 
ngOnChange(){
  console.log(this.miUser)
  }
deleteUser(_id: string) {
    toast('Esto borrará permanente el usuario',{
      action: {
        label: 'Borrar',
        onClick: async () => {
          await this.personajesServices.deleteUser(_id).then(() => {
            toast.success(`El usuario ${this.miUser.first_name} ${this.miUser.last_name} ha sido borrado`)
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
