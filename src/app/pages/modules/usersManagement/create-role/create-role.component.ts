import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ApiService} from '../../../../services/apiService';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})


export class CreateRoleComponent implements OnInit, AfterViewInit {

  @Input() isClose: any;
  @Input() isDisplayForm: any;
  @Output() cancelEvent = new EventEmitter();


  privDropdownList = [];
  distinctPrivileges = [];
  privilegesArray = [];
  funcDropdownList = [];
  distinctFunctionality = [];
  functionalityArray = [];

  exampleDatabase: null;
  genericParamsApiData: any;
  tableData: any[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  privilegeList = [];
  successMsg = false;
  submitted = false;



  public createRoleForm: FormGroup;

  constructor(private fb: FormBuilder,
              public dialog: MatDialog,
              private apiService: ApiService
  ) {
  }

  createDataForApi(active, direction, pageIndex, pageSize) {
    const sort = {};
    if (active) {
      sort[direction.toUpperCase()] = [active];
    }
    return {
      commonParamHash: {
        entityName: 'Role',
        operation: 'READ',
        pagination: {
          pageNumber: pageIndex,
          pageSize
        },
        sort
      }
    };
  }

  ngOnInit() {

    this.createRoleForm = this.fb.group({
      roleName: [''],
      roleDesc: [''],
      privileges: [''],
      functionality: [''],
    });

    this.apiService.postTypeRequest('/admin/crud',
      this.createPrivilegeApi())
      .subscribe((res: any) => {
        res.responseResult.data.content.forEach((row: any) => {
            this.privDropdownList.push(row);
          }
        );
      });

    this.apiService.postTypeRequest('/admin/crud',
      this.createDataForFuncApi())
      .subscribe((res: any) => {
        res.responseResult.data.content.forEach((row: any) => {
            this.funcDropdownList.push(row);
          }
        );
      });
  }

  ngAfterViewInit() {
  }


  getPrivilegeIds(privileges) {
    privileges.forEach((privilege: any) => {
        this.privilegesArray.push({ 'privilegeId': privilege.privilegeId });
     })
   
  }

  getFunctionalityIds(functionality) {
    functionality.forEach((func: any) => {
      this.functionalityArray.push({'id':  func.id  });
     })
   
  }


  async createRole() {
    const roleName = this.createRoleForm.value.roleName;
    const roleDesc = this.createRoleForm.value.roleDesc;
    const privileges = this.createRoleForm.value.privileges;
    const functionality = this.createRoleForm.value.functionality;



    try {

      await this.getPrivilegeIds(privileges);

      try {
        await this.getFunctionalityIds(functionality);
        console.log(roleName , roleDesc, this.privilegesArray, this.functionalityArray);
        this.apiService.postTypeRequest('/admin/crud',
        this.createDataForRoleApi(roleName, roleDesc, this.privilegesArray, this.functionalityArray))
        .subscribe(res => {
          if (res['isError'] === false) {
            this.successMsg = true;
            setTimeout(() => {
              this.cancel();
            }, 2000);
          }
        });

      } catch (funcError) {
      }
    } catch (privilegesError) {
    }



/*
    this.apiService.postTypeRequest('/admin/crud',
      this.createSearchForFuncApi(functionality))
      .subscribe((res: any) => {
        res.responseResult.data.content.forEach((row: any) => {
            this.functionalityArray.push(row);
            console.log(this.functionalityArray);
          }
        );
      });*/

   /* this.apiService.postTypeRequest('/admin/crud',
      this.createSearchForPrivApi(privileges))
      .subscribe((res: any) => {
        console.log(res);
        res.responseResult.data.content.forEach((row: any) => {
            this.privilegesArray.push(row);
            console.log(this.privilegesArray);
          }
        );
      });*/

   
  }

  createSearchForPrivApi(privilege) {
    return {
      commonParamHash: {
        entityName: 'Privilege',
        operation: 'SEARCH'

      },
      objectHash: {
        privilege: privilege
      }
    };
  }

  createDataForRoleApi(roleName, roleDesc, privileges, functionaries) {
    return {
      commonParamHash: {
        entityName: 'Role',
        operation: 'CREATE'
      },
      objectHash: {
        roleName, roleDesc, privileges, functionaries
      }
    };
  }


  createDataForFuncApi() {
    return {
      commonParamHash: {
        entityName: 'Functionality',
        operation: 'READ',
      }
    };
  }


  createPrivilegeApi() {
    return {
      commonParamHash: {
        entityName: 'Privilege',
        operation: 'READ',
        sort: {
          ASC: [
            'privilegeId'
          ]
        }
      }
    };
  }

  createRoleApi(createRolePrivId, roleName, roleDesc) {
    return {
      commonParamHash: {
        entityName: 'Role',
        operation: 'CREATE'
      },
      objectHash: {
        roleName,
        roleDesc,
        privileges: [
          {
            privilegeId: createRolePrivId
          }
        ]

      }
    };
  }

  createRoleApiWithoutPrivilege(roleName, roleDesc) {
    return {
      commonParamHash: {
        entityName: 'Role',
        operation: 'CREATE'
      },
      objectHash: {
        roleName,
        roleDesc
      }
    };
  }



  createSearchForFuncApi(functionality) {
    return {
      commonParamHash: {
        entityName: 'Functionality',
        operation: 'SEARCH'

      },
      objectHash: {
        name: functionality
      }
    };
  }

  cancel() {
    this.cancelEvent.emit();
    this.successMsg = false;
    setTimeout(() =>  {
      this.submitted = false;
    }, 500);
  }
}
