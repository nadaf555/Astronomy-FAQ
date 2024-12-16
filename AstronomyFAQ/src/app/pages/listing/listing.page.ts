import { Component, OnInit } from '@angular/core';
import { DatabaseServiceService } from 'src/app/database-service.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  faqs:any[]=[];

  constructor(private db: DatabaseServiceService) { }

  ngOnInit() {
    this.db.getAllFAQS().subscribe((data:any)=>{
      this.faqs=data;
      
    })
  }

}
