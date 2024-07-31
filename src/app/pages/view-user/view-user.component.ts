import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { ICON } from 'src/assets/icon';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {
  private userSrevice=inject(UsersService);
  private activedRoute=inject(ActivatedRoute)
  private router=inject(Router)
 user:User|any;
 private imgTrash: string = ICON.trash;
 private update: string = ICON.update;
 private magnifying_glass: string = ICON.magnifying_glass;
  constructor(){}


  getImageTrash(): string {
    return this.imgTrash;
  }
  getImageUpdate(): string {
    return this.update;
  }
  getImageGlass(): string {
    return this.magnifying_glass;
  }
  ngOnInit(){
    this.activedRoute.params.subscribe((params:any)=>{
      let iduser:string=params.iduser;
    
      this.userSrevice.getById(iduser).subscribe((data)=>{
        this.user=data;
      })
    })
  }

  async deleteUser(id:string,firstname:String,lastname:string){
    this.confirm(id,firstname,lastname)
   }
 
   confirm(id:string,firstname:String,lastname:string){
     
     Swal.fire({
       title: `Estás seguro que deseas borrar el usuario ${firstname} ${lastname}?` ,
       text: "¡No podrás revertir esto!",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Borrar usuario"
     }).then(async(result) => {
       const response=await this.userSrevice.deleteById(id)
       console.log(response)
       if(response.id){
        this.router.navigate(['/'])
         if (result.isConfirmed) {
           Swal.fire({
             title: "Borrado!",
             text: "El usuario ha sido  borrado",
             icon: "success",
           });
         }
       
       }
     
     });
 
   }
 }
 
 

