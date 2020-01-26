import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ApiService } from '../../../../services/apiService';
// import { GenericParam, GenericParams } from '../../../core/models/genricParams.model';
import { MatDialog } from '@angular/material';
// import { ConfirmDialogueComponent } from 'src/app/components/confirm-dialogue/confirm-dialogue.component';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  filter = {
    firstName_LIKE: '',
    emailId_LIKE: '',
    roles_FK: '',
    departments_FK: '',
    // partnerName_LIKE: '',
    // partnerType_LIKE: ''
  };
  searchUserForm: FormGroup;

  objectHash = {};
  rolesDropdownList = [];
  distinctRoles = [];
  distinctDept = [];
  deptDropdownList = [];
  partnerTypeDropdownList = [];
  partnerDropdownList = [];
  distinctPartnerType = [];
  distinctPartnerList = [];
  isDisplayForm = false;
  isDisplayEditForm = false;
  isClose = false;
  isCloseEditForm = false;
  firstName: any;
  lastName: any;
  selectedTransactionData = null;
  resultsLength = 0;

  displayedColumnsName = {
    userId: 'User Id',
    firstName: 'User Name',
    emailId: 'Email Id',
    roles: 'Role',
    departments: 'Department',
    partnerName: 'Partner',
    action: 'Action'
  };
  displayedColumns: string[] = [
    'userId',
    'firstName',
    'emailId',
    'roles',
    'departments',
    'partnerName',
    'action'
  ];

  tableData: GenericParams[] = [];
  isLoadingResults = false;

  constructor(private fb: FormBuilder, public dialog: MatDialog,
    private apiService: ApiService) {
  }
  createDataForApi(entity) {
    return {
      commonParamHash: {
        entityName: entity,
        operation: 'READ',
      }
    };
  }

  createDataForUserSearchApi(active, direction, pageIndex, pageSize) {
    const sort = {};
    if (active) {
      console.log('active', active);
      sort[direction.toUpperCase()] = [active];
    }
    return {
      commonParamHash: {
        entityName: 'UmGcsuserM',
        operation: 'SEARCH',
      }
    };
  }

  ngOnInit() {

    // this.apiService.postTypeRequest('/admin/crud',
    //   this.createDataForApi('Department'))
    //   .subscribe((res: any) => {
    //     res.responseResult.data.content.forEach((row: any) => {
    //       if (!this.distinctDept.includes(row.name) && row.name !== '' && row.name !== null) {
    //         this.distinctDept.push(row.name);
    //         this.deptDropdownList = this.distinctDept;
    //       }
    //     }
    //     );
    //   });


    // this.apiService.postTypeRequest('/admin/crud',
    //   this.createDataForApi('PartnerM'))
    //   .subscribe((res: any) => {
    //     res.responseResult.data.content.forEach((row: any) => {
    //       if (!this.distinctPartnerType.includes(row.partnerType) && row.partnerType !== '' && row.partnerType !== null) {
    //         this.distinctPartnerType.push(row.partnerType);
    //         this.partnerTypeDropdownList = this.distinctPartnerType;
    //       }

    //       if (row.status === 'A') {
    //         if (!this.distinctPartnerList.includes(row.partnerName) && row.partnerName !== '' && row.partnerName !== null) {
    //           this.distinctPartnerList.push(row.partnerName);
    //           this.partnerDropdownList = this.distinctPartnerList;
    //         }
    //       }
    //     }
    //     );
    //   });



    // this.apiService.postTypeRequest('/admin/crud',
    //   this.createDataForApi('Role'))
    //   .subscribe((res: any) => {
    //     res.responseResult.data.content.forEach((row: any) => {
    //       if (!this.distinctRoles.includes(row.roleName) && row.name !== '' && row.name !== null) {
    //         this.distinctRoles.push(row.roleName);
    //         this.rolesDropdownList = this.distinctRoles;
    //       }
    //     }
    //     );
    //   });



    this.searchUserForm = this.fb.group({
      firstName: [''],
      emailId: [''],
      roles: [''],
      pType: [''],
      partnerName: [''],
      dept: [''],
    });



  }
  edit(row){

  }
  ngAfterViewInit() {
    console.log("this.sort",this.sort)
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          console.log("****************")
          return this.apiService.postTypeRequest('getUser.json',
            this.createDataForUserApi(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize));
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
          console.log(d);
          if (d.departments.length > 0) {
            const deptData = [];
            d.departments.forEach(dept => deptData.push(dept.name));
            d.departments = deptData.toString();
          }

          if (d.roles.length > 0) {
            const roleData = [];
            d.roles.forEach(role => roleData.push(role.roleName));
            d.roles = roleData.toString();
          }
        });
        this.tableData = data;
      });
  }


  addUser(data) {
    this.selectedTransactionData = data;
    this.isDisplayForm = !this.isDisplayForm;
    this.isClose = !this.isClose;
  }


  delete(partner) {
    // try {
    //   console.log(partner);
    //   const dialogRef = this.dialog.open(ConfirmDialogueComponent, {
    //     width: '400px',
    //     data: {
    //       message: 'Are you sure ?'
    //     }
    //   });
    //   dialogRef.afterClosed().subscribe(result => {
    //     console.log('The dialog was closed', result);
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  }
  search() {
    this.objectHash = {};
    Object.keys(this.filter).forEach((val) => {
      if (this.filter[val] && this.filter[val].length) {
        if (val === 'roles_FK') {
          const str = this.filter[val];
          const splitted = str.split(',');
          this.objectHash[val] = { roleName: splitted };
        } else if (val === 'departments_FK') {
          const str = this.filter[val];
          const splitted = str.split(',');
          this.objectHash[val] = { name: splitted };
        } else {
          this.objectHash[val] = `%${this.filter[val]}%`;
        }
      }
    });
  }

  searchUser() {

    this.filter = {
      firstName_LIKE: `${this.searchUserForm.value.firstName ? this.searchUserForm.value.firstName : ''}`,
      emailId_LIKE: `${this.searchUserForm.value.emailId ? this.searchUserForm.value.emailId : ''}`,
      roles_FK: `${this.searchUserForm.value.roles ? this.searchUserForm.value.roles : ''}`,
      departments_FK: `${this.searchUserForm.value.dept ? this.searchUserForm.value.dept : ''}`,
      // partnerName_LIKE: `${this.searchUserForm.value.partner ? this.searchUserForm.value.partner : ''}`,
      // partnerType_LIKE: `${this.searchUserForm.value.pType ? this.searchUserForm.value.pType : ''}`,
    };
    this.search();
    this.getUserData(true);
  }

  getUserData(isSearch?) {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          if (Object.keys(this.objectHash).length > 0) {
            const data = this.createDataForUserSearchApi(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
            data['objectHash'] = this.objectHash;
            return this.apiService.postTypeRequest('/admin/crud', data);
          } else {
            return this.apiService.postTypeRequest('/admin/crud',
              this.createDataForUserApi(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize));
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
          console.log(d);
          if (d.departments.length > 0) {
            const deptData = [];
            d.departments.forEach(dept => deptData.push(dept.name));
            d.departments = deptData.toString();
          }

          if (d.roles.length > 0) {
            const roleData = [];
            d.roles.forEach(role => roleData.push(role.roleName));
            d.roles = roleData.toString();
          }
        });
        this.tableData = data;
      });
  }

  resetUserForm() {
    this.searchUserForm.reset();
    this.filter = {
      firstName_LIKE: '',
      emailId_LIKE: '',
      roles_FK: '',
      departments_FK: ''
    };
    this.objectHash = {};
  }


  createDataForUserApi(active, direction, pageIndex, pageSize) {
    const sort = {};
    if (active) {
      sort[direction.toUpperCase()] = [active];
    }
    return {
      commonParamHash: {
        entityName: 'UmGcsuserM',
        operation: 'READ',
        pagination: {
          pageNumber: pageIndex,
          pageSize
        },
        sort
      }
    };
  }



}





export interface GenericParams {

}
