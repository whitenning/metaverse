import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/globalService/global.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
constructor(private globalService: GlobalService, private activatedRoute: ActivatedRoute){}

user: any

ngOnInit(): void {
  this.activatedRoute.params.subscribe((params:any) => {
    this.globalService.getUser(params.address).subscribe({
      next: res => {
        this.user = res
      }
    })
  })
    
}
}
