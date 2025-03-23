import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { IResponse, IUser } from '../../interfaces/i-response.interface';
import { UserCardComponent } from "../../components/user-card/user-card.component";

@Component({
  selector: 'app-home',
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  arrObservableUsuarios: IUser[] = [];
  usersServices = inject(UsersService)

  ngOnInit(): void {
    this.usersServices.getAllObservable().subscribe({
      next: (data: IResponse) => {
        this.arrObservableUsuarios = data.results
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  goPreviousPage() {
    this.usersServices.getAllObservable(this.usersServices.page - 1).subscribe({
      next: (data: IResponse) => {
        this.arrObservableUsuarios = data.results
        window.scrollTo(0, 0);
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  goNextPage() {
    this.usersServices.getAllObservable(this.usersServices.page + 1).subscribe({
      next: (data: IResponse) => {        
        this.arrObservableUsuarios = data.results
        window.scrollTo(0, 0);
      },      
      error: (error) => {
        console.log(error)
      }
    })
  }
}
