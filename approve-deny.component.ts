import { Component, OnInit } from '@angular/core';
import { Observable }from 'rxjs';
import { LeaveDetailsService }from"../leave-details.service";
import { EmployeeService }from"../employee.service";
import {ActivatedRoute,Router} from '@angular/router';
import { Employee }from "../employee";
import { LeaveDetails }from"../leave-details"; 


@Component({
  selector: 'app-approve-deny',
  templateUrl: './approve-deny.component.html',
  styleUrls: ['./approve-deny.component.css']
})
export class ApproveDenyComponent implements OnInit {
  leave : Observable<LeaveDetails>;
  empno : number;
  levID : string;
  employ : Observable<Employee>;
  obj : LeaveDetails;
  status :string;
   msg : String;
   lEmpId : number;
  

  constructor(private leaveDetailsService: LeaveDetailsService,
              private employeeService: EmployeeService,private route: ActivatedRoute,
              private _router : Router) {
    this.empno = this.route.snapshot.params["uname"];
        this.levID = localStorage.getItem("levId");
        this.leave = leaveDetailsService.getLeaves(this.levID);
        this.obj = new LeaveDetails();
        this.lEmpId = parseInt(localStorage.getItem("lEmpId"));
        this.employ = employeeService.searchEmployee(this.lEmpId);
    alert(this.levID);
  }

  approve(){
    //alert("Leave Approved sucessfully..");
    this.obj.levId = this.levID;
    this.status = "YES";
    

    this.leaveDetailsService.approveDeny(this.empno,this.status,this.obj).subscribe(
      dd => {
        this.msg=dd;
      },
      errorMsg => {
        this.msg=errorMsg;
        console.log(errorMsg);
      }
    )
    // this._router.navigate(["/dashboard"]);
  }

  deny() {
    this.obj.levId = this.levID;
    this.status = "NO";

    this.leaveDetailsService.approveDeny(this.empno,this.status,this.obj).subscribe(
      dd => {
        this.msg=dd;
      },
      errorMsg => {
        this.msg=errorMsg;
        console.log(errorMsg);
      }
    )
  }

  cancel() {
    this._router.navigate(["/dashboard"]);
  }

  ngOnInit() {
  }

}
