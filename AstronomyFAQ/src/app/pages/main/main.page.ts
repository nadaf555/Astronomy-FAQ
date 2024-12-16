import { Component, OnInit } from '@angular/core';
import { DatabaseServiceService } from 'src/app/database-service.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage  {
  dbName:string="";
  collectionName:string="";
 
  completedMessage:any;
  isDatabaseCreated:boolean=false;

  constructor(private db: DatabaseServiceService,public actionSheetController: ActionSheetController) { }

 
 
    async presentActionSheetLoad() {
      const actionSheet = await this.actionSheetController.create({
      header: 'Batch Load',
      buttons: [ { text: 'Batch Load Items',
      handler: () => { this.batchLoadItems() } }
      ]
      });
      await actionSheet.present();
      }
      
      async presentActionSheetDelete() {
        const actionSheet = await this.actionSheetController.create({
        header: 'Delete All Items?',
        buttons: [ { text: 'Delete', icon: 'trash',
        role: 'destructive',
        handler: () => { this.deleteAllItems() } }
        ]
        });
        await actionSheet.present();
        }
  

 
  createDbCollection() {
    if (this.dbName && this.collectionName) {
      this.db.createDatabaseAndCollection(this.dbName.toLowerCase(), this.collectionName.toLowerCase()).subscribe({
        next: (data:any) => { 
          console.log(data);
          this.isDatabaseCreated=true;

        },
        error: (e) => { console.log(e);},
        complete: () => console.info('Completion of the request.') });
      
  }else{
    console.log("Enter the database and collection name.")
  }
 
}
batchLoadItems(){
 if (this.collectionName){
  const items=[
    {
      "question": "What is Astronomy?",
      "answer": "Astronomy is the study of celestial objects and phenomena."
    },
    {
      "question": "What is a star?",
      "answer": "A star is a luminous sphere of plasma held together by gravity."
    },
    {
      "question": "What is the Milky Way?",
      "answer": "The Milky Way is the galaxy that contains our Solar System."
    },
    {
      "question": "What is a black hole?",
      "answer": "A black hole is a region of space where gravity is so strong that nothing, not even light, can escape it."
    },
    {
      "question": "What is a comet?",
      "answer": "A comet is an icy celestial body that releases gas or dust as it approaches the Sun."
    },
    {
      "question": "What are constellations?",
      "answer": "Constellations are patterns of stars in the night sky that are often associated with myths and stories."
    }
  ]
  this.db.batchLoadItems(this.dbName.toLowerCase(), this.collectionName.toLowerCase(), items).subscribe((response) => {
    console.log(response);
  });
 }else{
  console.log("Create a database and collection name first. A database must be created first to load items.")
 }
    
}

deleteAllItems() {
  if (this.dbName && this.collectionName) {
    this.db.deleteAllItems(this.collectionName)
    .subscribe({
      next: (data:any) => { 
        console.log(data)
        ;
       
      },
      error: (e) => {console.log(e)},
      complete: () => console.info('Complete') });
    
  }else{
    console.log("Create database and collection first and then load items so that items can be deleted")
  }
}
}
