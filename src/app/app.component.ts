import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title: string = '';//'myrminki-frontend';

  constructor (
    private http: HttpClient,
  ) { }

  errorHandler(err: HttpErrorResponse){
    return throwError(
        err.message ||
        'Error [App]: ' + 'Inhabilitado para completar la peticion.'
    );
  }

  getMain(): Observable<string> {
    return this.http
      .get<string>(`https://myrminki-api.up.railway.app/`)
      .pipe(catchError(this.errorHandler));
  }

  ngOnInit() {
    this.getMain().subscribe(
      res => {
        if(res){
          this.title = res;
        }
      }
    );
  }

}
