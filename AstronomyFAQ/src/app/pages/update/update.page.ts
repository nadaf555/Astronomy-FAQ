import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseServiceService } from 'src/app/database-service.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  answer:any;
  question:any;
  addAnswer:any;
  addQuestion:any;

  addOneResponse:any;
  deleteOneResponse:any;
  updateResponse:any;
  faqs:any[]=[];
  faqsInUpdatePage:any;
  constructor(private route: ActivatedRoute,private db:DatabaseServiceService,public actionSheetController: ActionSheetController) { }
  async presentActionSheetUpdate() {
    const actionSheet = await this.actionSheetController.create({
    header: 'Are you sure you want to edit and update this item?',
    buttons: [ { text: 'Pretty Sure.',
    handler: () => { this.updateSingle() } }
    ]
    });
    await actionSheet.present();
  }
  async presentActionSheetAdd() {
    const actionSheet = await this.actionSheetController.create({
    header: 'New item will be added to the database. You want to proceed?',
    buttons: [ { text: 'Yes',
    handler: () => { this.insertOne() } }
    ]
    });
    await actionSheet.present();
  }
  async presentActionSheetDelete() {
    const actionSheet = await this.actionSheetController.create({
    header: 'This item will be deleted permanently. Do you want to proceed?',
    buttons: [ { text: 'Yes',
    handler: () => { this.deleteOne() } }
    ]
    });
    await actionSheet.present();
  }
  
    

  ngOnInit() {
    this.db.getAllFAQS().subscribe((data:any)=>{
      const id =this.route.snapshot.paramMap.get('id');
      this.faqs=data;
      const matchingData = this.faqs.filter((records: any) => records._id === id);
      this.faqsInUpdatePage=matchingData[0];
      console.log(this.faqsInUpdatePage)
     
    })
    let updateBlock= document.getElementById("update");
    if (updateBlock){
      updateBlock.style.display="none";
    }



  }

  deleteOne(){
    this.db.deleteOne(this.faqsInUpdatePage).subscribe((response:any)=>{
      this.deleteOneResponse=response.Message;
      console.log(this.deleteOneResponse)

    })

  }
  displayUpdateItemsBlock(){
    if(this.faqsInUpdatePage){
      this.question=this.faqsInUpdatePage.question;
      this.answer=this.faqsInUpdatePage.answer;

    }
    
    let updateBlock= document.getElementById("update");
    if (updateBlock){
      updateBlock.style.display="block";
    }

  }
  updateSingle() {

    const updatedFields = {

      question: this.question,

      answer: this.answer

      // Add other fields as necessary

    };


    this.db.updateOne(this.faqsInUpdatePage._id, updatedFields).subscribe( {
      next:(data:any)=>{
        this.updateResponse=data.message;
        console.log(this.updateResponse)
      },
      error:(e)=>{console.log(e)}


    
    });

  }
  insertOne(){
    if(this.addAnswer && this.addQuestion){
      this.db.insertOne(this.addQuestion,this.addAnswer).subscribe({
        next:(data:any)=>{
          this.addOneResponse=data.Message;
        },
        error:(e:any)=>{console.log(e)}
      })
    }
    else{
      this.addOneResponse="Please provide question and answer for the new item to add."
    }

  }

}
