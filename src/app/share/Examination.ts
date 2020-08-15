import { User } from '../share/User';
import { Clinic } from './Clinic';

export class Examination
{
    doctor: User;
    freeExaminations: Array<Date>;

    constructor(
        doctor: User,
        freeExaminations: Array<Date>
    ){
        this.doctor = doctor;
        this.freeExaminations = freeExaminations;
    }
}