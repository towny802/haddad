import { Component, Output, Input, SimpleChanges } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CalculatorResponse } from './CalculatorReponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'haddad';
  @Input() leftoperand: number = 5;
  @Input() rightoperand: number = 1;
  @Input() operator: string = "+";
  output: number = this.leftoperand + this.rightoperand;


  constructor(private http: HttpClient) {
    
  }

  update() {

    var operation = "Add"
    if(this.operator == "+"){
      operation = "Add"
    } else if(this.operator == "/"){
      operation = "Divide"
    } else if(this.operator == "-") {
      operation = "Subtract"
    } else if (this.operator == "*") {
      operation = "Multiply"
    } else if (this.operator == "%") {
      operation = "Modulus"
    }

    this.http.get<CalculatorResponse>("http://localhost:5000/Calculator/api/"+operation+"?leftoperand="+this.leftoperand+"&rightoperand="+this.rightoperand).subscribe(data => {
      this.output = data.result;
      console.log("Response: "+data.result);
    }, error => {
      console.log("error");
      this.output = -9999;
    });
  }
}
