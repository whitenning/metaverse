import { Component, OnInit } from '@angular/core';

import  {FormGroup, FormBuilder, Validators} from "@angular/forms"
import { GlobalService } from 'src/app/services/globalService/global.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  constructor(private fb: FormBuilder, private globalService: GlobalService){}


  submitted: boolean = false
  user: any = null
  wallet: string = ''
  signUpForm!: FormGroup

  userData: any = {
    name: '',
    email: '',
    wallet: ''
  }

 modal: any = {
  header: 'WALLET IS NOT CONNECTED',
  type: 'error',
  text: 'You must to connect wallet in Metamask to participate',
  link: '',
  linkText: '',
  textButton: 'OK'
}

  modalError: boolean = false

  isModalActive(){
    if(!this.modalError){
      this.modalError = true
      window.location.reload()
    } else {
      this.modalError =false
      
    }
  }
  removeUser(){
  this.usersList.items.shift()

  }
usersList: any
// Submit form function
  signUpBetaSubmit(value: any){
    // Checking whether form contains error // 
    if(this.signUpForm.controls['username'].errors === null && this.signUpForm.controls['email'].errors  === null){
      this.submitted = true
    }
     // If form validated and wallet is connected // 
    if(this.submitted && this.wallet != ''){
      this.userData.username = value.username
      this.userData.email = value.email
      this.userData.address = this.wallet
  
      // Sign-up with userData //
      this.globalService.signUpBeta(this.userData)

      // Get created user by wallet //
      this.globalService.authMe().subscribe({
        next: res=> {
          this.globalService.setUser(this.userData)
          setTimeout(() => {
            this.globalService.getUsersList(1, 50).subscribe({
              next: (res:any) => {
                this.usersList = res
                this.usersList.items.unshift(this.user)
                this.isLoading = false; 
              }
            })
          }, 1000);
        }
      })

 
       // Boolean for inialiazation modal(error) so if wallet isn't connected it will remain false and trigger an error // 
      this.modalError = true
    }
  }


  


  isLoading: boolean = true;

  ngOnInit(): void {
    this.globalService.user$.subscribe((user)=> {
      this.user = user
    })

  if(this.user != null){
    setTimeout(() => {
      this.globalService.getUsersList(1, 50).subscribe({
        next: (res:any) => {
          this.usersList = res
          this.usersList.items.unshift(this.user)
          this.isLoading = false;
        }
      })
    }, 1000);
  }
    this.globalService.wallet$.subscribe(wallet => {
      this.wallet = wallet
      console.log(this.wallet)
    });
   
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
    })

  }

  // Planet mouse attract animation //
  movePlanet(event: MouseEvent) {
    const planet: any = document.querySelector('.planet img');
    const planetRect = planet.getBoundingClientRect();
    const animationEntry: any = document.querySelector('.animation-entry');
    const animationEntryRect = animationEntry.getBoundingClientRect();
  
    const x = event.clientX;
    const y = event.clientY;
  
    const maxX = animationEntryRect.right - planetRect.width / 2;
    const maxY = animationEntryRect.bottom - planetRect.height / 2;
    const minX = animationEntryRect.left + planetRect.width / 2;
    const minY = animationEntryRect.top + planetRect.height / 2;
  
    const planetX = Math.min(maxX, Math.max(minX, x));
    const planetY = Math.min(maxY, Math.max(minY, y));
  
    const deltaX = planetX - planetRect.x - planetRect.width / 2;
    const deltaY = planetY - planetRect.y - planetRect.height / 2;
  
    planet.style.transition = 'transform 1s ease-out';
    planet.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  
    animationEntry.addEventListener('mouseleave', () => {
      planet.style.transition = 'transform 0.5s ease-out';
      planet.style.transform = 'translate(0, 0)';
    });
  }


}
