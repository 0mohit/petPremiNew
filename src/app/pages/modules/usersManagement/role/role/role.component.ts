import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ApiService } from '../../../../../services/apiService';
import { CommonApiService } from '../../../../../services/common-api.service'
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from './../../../../components/confirmation-dialog/confirmation-dialog.component';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

 
  filter = {
    roleName_LIKE: '',
    roleDesc_LIKE: '',
    privileges_FK: '',
  };

  displayedColumnsName = {
    roleName: 'Role Name',
    roleDesc: 'Role Description',
    privileges: 'Privilege',
    functionaries: 'Functionality',
    action: 'Action'
  };
  displayedColumns: string[] = [
    'roleName',
    'roleDesc',
    'privileges',
    'functionaries',
    'action'
  ];


  funcDropdownList = [];
  privilegesDropdownList = [];
  distinctPrivileges = [];
  distinctFunctionality = [];
  objectHash = {};
  exampleDatabase: null;
  genericParamsApiData: any;
  tableData: any[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isDisplayForm = false;
  isDisplayEditForm = false;
  isClose = false;
  isCloseEditForm = false;
  roleData: any;


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  public searchRoleForm: FormGroup;
  constructor(private fb: FormBuilder,
              public dialog: MatDialog,
              private apiService: ApiService,
              private commonApiService: CommonApiService
          
  ) { }



  ngOnInit(): void {

    this.searchRoleForm = this.fb.group({
      roleName: [''],
      roleDesc: [''],
      privileges: [''],
      functionality: [''],
    });

    this.apiService.postTypeRequest('/admin/crud',
      this.createDataPrivilegeApi())
      .subscribe((res: any) => {
        res.responseResult.data.content.forEach((row: any) => {
            if (!this.distinctPrivileges.includes(row.privilege) && row.privilege !== '' && row.privilege !== null) {
              this.distinctPrivileges.push(row.privilege);
              this.privilegesDropdownList = this.distinctPrivileges;
            }
          }
        );
      });


    this.apiService.postTypeRequest('/admin/crud',
      this.createDataForFuncApi())
      .subscribe((res: any) => {
        res.responseResult.data.content.forEach((row: any) => {
            if (!this.distinctFunctionality.includes(row.name) && row.name !== '' && row.name !== null) {
              this.distinctFunctionality.push(row.name);
              this.funcDropdownList = this.distinctFunctionality;
            }
          }
        );
      });

  }

  ngAfterViewInit() {
    this.getRecords();
  }

  getRecords(){
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.apiService.postTypeRequest('/admin/crud',
            this.createDataForApi(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize));
        }),
        map((genericParamsApiData: any) => {
          this.isLoadingResults = false;
          if (genericParamsApiData.isError) {
            return observableOf([]);
          } else {
            this.resultsLength = genericParamsApiData.responseResult.data.totalElements;
            return genericParamsApiData.responseResult.data.content;
          }
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe((data: any[]) => {

      data.forEach((d: any) => {

        if (d.functionaries) {

          const functionalityData = [];
          d.functionaries.forEach(functionality => functionalityData.push(functionality.name));
          d.functionaries = functionalityData.toString();
        }

        if (d.privileges) {

          const privilegeData = [];
          d.privileges.forEach(privilegeNames => privilegeData.push(privilegeNames.privilege));
          d.privileges = privilegeData.toString();
        }
    });
      this.tableData = data;
      console.log('this.tableData', this.tableData);
      });
  }

  delete(row, index) {
    try {
      
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '400px',
        data: {
          message: 'Are you sure ?'
        }
      });
     
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.apiService.postTypeRequest('/admin/crud',
          this.commonApiService.deleteEntryFromTable('Role','roleId',row.roleId)).subscribe(res => {
            this.getRecords();
          });
          
          // console.log('index',index)
          // console.log((this.paginator.pageIndex * this.paginator.pageSize) + index)
          // console.log('this.tableData', this.tableData)
          // //this.tableData = this.tableData.splice((this.paginator.pageIndex * this.paginator.pageSize) + index,1);
        }  
      });

    } catch (err) {
      console.log(err);
    }
  }

  createDataPrivilegeApi() {
    return {
      commonParamHash: {
        entityName: 'Privilege',
        operation: 'READ'
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


  /*****For Search role**/
  search() {
    this.objectHash = {};
    Object.keys(this.filter).forEach((val) => {
      if (this.filter[val] && this.filter[val].length) {
        if (val === 'privileges_FK') {
          const str = this.filter[val];
          const splitted = str.split(',');
          console.log(splitted);
          this.objectHash[val] = {privilege : splitted };
        } else {
          this.objectHash[val] = `%${this.filter[val]}%`;
        }
      }
    });
  }

  searchRoles() {
    this.filter = {
      roleName_LIKE: `${this.searchRoleForm.value.roleName ? this.searchRoleForm.value.roleName : ''}`,
      roleDesc_LIKE: `${this.searchRoleForm.value.roleDesc ? this.searchRoleForm.value.roleDesc : ''}`,
      privileges_FK: `${this.searchRoleForm.value.privileges ? this.searchRoleForm.value.privileges : ''}`
    };
    this.search();
    this.getRolesData(true);
  }

  getRolesData(isSearch?) {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          if (Object.keys(this.objectHash).length > 0) {
            const data = this.createDataForRoleSearchApi(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
            data['objectHash'] = this.objectHash;
            return this.apiService.postTypeRequest('/admin/crud', data);
          } else {
            return this.apiService.postTypeRequest('/admin/crud',
              this.createDataForApi(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize));
          }
        }),
        map((genericParamsApiData: any) => {
          this.isLoadingResults = false;
          if (genericParamsApiData.isError) {
            return observableOf([]);
          } else {
            this.resultsLength = genericParamsApiData.responseResult.data.totalElements;
            return genericParamsApiData.responseResult.data.content;
          }
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe((data: any[]) => {

      data.forEach((d: any) => {

        if (d.functionaries) {

          const functionalityData = [];
          d.functionaries.forEach(functionality => functionalityData.push(functionality.name));
          d.functionaries = functionalityData.toString();
        }

        if (d.privileges) {

          const privilegeData = [];
          d.privileges.forEach(privilegeNames => privilegeData.push(privilegeNames.privilege));
          d.privileges = privilegeData.toString();
        }
      });
      this.tableData = data;
    });
  }

  resetRoleForm() {
    this.searchRoleForm.reset();
    this.filter = {
      roleName_LIKE: '',
      roleDesc_LIKE: '',
     privileges_FK: '',
    };
    this.objectHash = {};
  }
  /*****End Here**/


  createDataForRoleSearchApi(active, direction, pageIndex, pageSize) {
    const sort = {};
    if (active) {
      console.log('active', active);
      sort[direction.toUpperCase()] = [active];
    }
    return {
      commonParamHash: {
        entityName: 'Role',
        operation: 'SEARCH',
      }
    };
  }


  add() {
    this.isDisplayForm = ! this.isDisplayForm;
    this.isClose = ! this.isClose;
  }



  cancelEdit(event) {
    this.isDisplayEditForm = false;
    setTimeout(() => {
      this.isCloseEditForm = false;
    }, 900);
  }

  cancelAdd(event) {
    this.isDisplayForm = false;
    setTimeout(() => {
      this.isClose = false;
    }, 900);
  }

  edit(role) {

    this.isDisplayEditForm = ! this.isDisplayEditForm;
    this.isCloseEditForm = ! this.isCloseEditForm;
    this.roleData = role;
  }

}
