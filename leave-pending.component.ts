import { Component, OnInit } from '@angular/core';
import { Observable }from 'rxjs';
import { LeaveDetailsService }from"../leave-details.service";
import {Router} from '@angular/router';
import { Employee }from "../employee";
import { LeaveDetails }from"../leave-details";
import { EmployeeService }from"../employee.service";

// import { LeaveHistory } from './leave-history';



@Component({
  selector: 'app-leave-pending',
  templateUrl: './leave-pending.component.html',
  styleUrls: ['./leave-pending.component.css']
})
export class LeavePendingComponent implements OnInit {
edata :Observable<Employee[]>;
  employ : Observable<LeaveDetails[]>;
  empno : string;
  flag:boolean;
  show(levId,empId) {
  localStorage.setItem("levId",levId);
  localStorage.setItem("lEmpId",empId);
  

    this.flag=true;
  }

  constructor(private leaveDetailsService: LeaveDetailsService, private employeeService: EmployeeService,
              private _router : Router) {
    this.empno = localStorage.getItem("uname");
    this.employ = leaveDetailsService.getPendingLeaves(this.empno);
    this.edata = employeeService.getEmployees();
    this.flag=false;
  }

  appDen() {
    this._router.navigate(["/appDen"]);    
      }
  

  ngOnInit() {
  }

}
