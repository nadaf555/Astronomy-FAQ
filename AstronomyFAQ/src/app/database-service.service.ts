import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {

  constructor(private http: HttpClient) { }

  createDatabaseAndCollection(dbName: string, collectionName: string){
    return this.http.post('http://127.0.0.1:8887/dbCreate/',
      {dbName,collectionName});

  }
  batchLoadItems(dbName:string,collectionName:string,items:any){
    return this.http.post('http://127.0.0.1:8887/loadItems/',
      {dbName,collectionName,items});
  }
  deleteAllItems( collectionName: string){
    const params = new HttpParams()
   
    .set('collectionName', collectionName);
    return this.http.delete('http://127.0.0.1:8887/deleteAll/',
      {params});
  }
  getAllFAQS(){
    return this.http.get('http://127.0.0.1:8887/retrieve/');
  }

  deleteOne(items:any){
    const params = new HttpParams()
   
    .set('items', JSON.stringify(items));
    return this.http.delete('http://127.0.0.1:8887/deleteOne/',{params});
  }
  updateOne(id: string, fields: any) {
    return this.http.put('http://127.0.0.1:8887/update', { id, fields });
  }
  insertOne(question:string,answer:string){
    return this.http.post('http://127.0.0.1:8887/insertOne',{question,answer});
  }
}
