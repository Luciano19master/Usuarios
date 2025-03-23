import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { IUser } from '../../interfaces/i-response.interface';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  @Input() idUser: string = '';
  userForm: FormGroup = new FormGroup({})
  user!: IUser;
  userService = inject(UsersService);
  route = inject(ActivatedRoute);
  title: string = 'Alta de nuevo usuario';
  router = inject(Router);

  async ngOnInit() {
    this.idUser = this.route.snapshot.paramMap.get('idUser') || '';
    if(this.idUser) {
      try{
      this.user = await this.userService.getById(this.idUser);
        this.title = 'Editar usuario';
      }
     catch (msg: any) {
      toast.error(msg.error)
      }
    }
    this.userForm = new FormGroup({
      _id: new FormControl(this.idUser || null,[]),
      first_name: new FormControl(this.user?.first_name || '', [Validators.required]),
      last_name: new FormControl(this.user?.last_name || '', [Validators.required]),
      email: new FormControl(this.user?.email || '', [Validators.required]),
      image: new FormControl(this.user?.image || null,[]),
    },[])  
  }

  async getDataForm() {
    if (this.userForm.invalid) {
      toast.error('Todos los campos deben estar rellenos');
      return;
    }

    let response: IUser | any;
    try {
      if (this.userForm.value._id) {
        response = await this.userService.update(this.userForm.value);
      } else {
        response = await this.userService.insert(this.userForm.value);
      }
      // Verificar si la respuesta contiene un campo 'id'
      if (response.id) {
        toast.success('Usuario guardado correctamente');
        this.router.navigate(['/home']);
      } 
    } catch (msg: any) {
      toast.error('Error al guardar el usuario');
    }
  }
}
