import { parseHostBindings } from '@angular/compiler';
import { AfterContentInit, Component, ContentChild, Host, OnInit } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  providers:[RoomsService]
})
export class ContainerComponent implements OnInit,AfterContentInit {

  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;

  constructor(@Host() private roomService:RoomsService) { }
  ngAfterContentInit(): void {
    this.employee.empName = "Raja";
  }

  ngOnInit(): void {
  }

}