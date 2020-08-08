import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { Vacation } from '../share/Vacation';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatDatepicker} from '@angular/material/datepicker';


@Component({
    selector: 'doctorHomePage-component',
    templateUrl: 'doctorHomePage.component.html',
    styleUrls: ['doctorHomePage.component.css']
})
export class DoctorHomePageComponent implements OnInit {

    public picker: any;
    public minDate: any;
    public id: any;
    public error: boolean = true;
    public user: any;
    public startDate: Date;
    public endDate: Date;
    
    constructor(private data: DataService, private arouter: ActivatedRoute) {}

    ngOnInit() {

        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.id = decodeToken.jti;
        //this.id = this.arouter.snapshot.paramMap.get('id');
        //this.id='b4d714ea-5536-46a0-8fe4-90b9a222b573';
        this.data.GetUserById(this.id).subscribe( response => {
            this.user = response;
        });
    }

    VacationRequest(form: NgForm) {
            let startDate = form.value.StartDate;            
            let endDate = form.value.EndDate;
        //if(this.endDate>this.startDate || this.endDate.getDay-this.startDate.getDay<15){
            const token = localStorage.getItem('token');
            const decodeToken = jwt_decode(token);
            const vacationRequest = new Vacation(decodeToken.Id, startDate, endDate);
            this.data.SendVacationRequest(vacationRequest);
        //}
    }

    edit(user) {
        this.data.UpdateProfile(this.user).subscribe(response => {
            location.reload();
        });
    }

}