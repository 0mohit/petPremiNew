import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/apiService';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit, OnChanges {
  @Input() isDisplayEditForm: any;
  @Input() isCloseEditForm: any;
  @Input() privilegesDropdownList = [];
  @Input() funcDropdownList = [];
  @Input() roleData: any;
  @Output() cancelEvent = new EventEmitter();
  submitted = false;
  successMsg = false;
  editRoleForm: FormGroup;
  funcData: any;
  funcList = [];
  privilegeData: any;
  privilegeList = [];
  refRoleData;

  objectHash: {};

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.editRoleForm = this.fb.group({
      roleName: [''],
      roleDesc: [''],
      privileges: [''],
      functionality: [''],

    });
  }

  ngOnInit() {
  }

  ngOnChanges(e) {
    if (this.roleData) {
      this.refRoleData = this.roleData;
      this.roleData = JSON.parse(JSON.stringify(this.roleData))
      if (this.roleData && this.roleData['privileges'] && typeof this.roleData['privileges'] === 'string') {
        this.roleData['privileges'] = this.roleData['privileges'].split(',');
      }

      if (this.roleData && this.roleData['functionaries'] && typeof this.roleData['functionaries'] === 'string') {
        this.roleData['functionaries'] = this.roleData['functionaries'].split(',');
      }

      this.editRoleForm.patchValue({
        roleName: this.roleData.roleName,
        roleDesc: this.roleData.roleDesc,
        privileges: this.roleData.privileges,
        functionality: this.roleData.functionaries
      });
    }
  }

  updateDataForRoleApi() {
    return {
      commonParamHash: {
        entityName: 'Role',
        operation: 'UPDATE',
      }
    };
  }

  get f() {
    return this.editRoleForm.controls;
  }

  createData(name, description, privileges, functionaries, id) {
    let commonParamHash = {};
    commonParamHash['entityName'] = "Role";
    commonParamHash['operation'] = "UPDATE";
    let objectHash = {};
    objectHash['roleId'] = id;
    objectHash['roleName'] = name;
    objectHash['roleDesc'] = description;
    objectHash['privileges'] = privileges;
    objectHash['functionaries'] = functionaries;
    let finalData = {};
    finalData['commonParamHash'] = commonParamHash;
    finalData['objectHash'] = objectHash;
    return finalData;
  }

  createPrivilegesList() {
    const promises = [];
    this.privilegeData.forEach((privilege: any) => {
      promises.push(new Promise((resolve, reject) => {
        this.apiService.postTypeRequest('/admin/crud', this.searchDataApi('Privilege', 'privilege', privilege)).subscribe((res: any) => {
          res.responseResult.data.content.forEach((row: any) => {
            this.privilegeList.push(row);
          });
          resolve(this.privilegeList);
        }, err => {
          reject(err);
        });

      }));
    })
    return Promise.all(promises);
  }

  createFunctionalityList() {
    const promises = [];
    this.funcData.forEach((functionality: any) => {
      promises.push(new Promise((resolve, reject) => {
        this.apiService.postTypeRequest('/admin/crud', this.searchDataApi('Functionality', 'name', functionality)).subscribe((res: any) => {
          res.responseResult.data.content.forEach((row: any) => {
            this.funcList.push(row);
          });
          resolve(this.funcList);
        }, err => {
          reject(err);
        });

      }));
    })
    return Promise.all(promises);
  }



  async submit() {
    this.submitted = true;
    if (this.editRoleForm.invalid) {
      return;
    }
  
    this['refRoleData']['roleName'] = this.editRoleForm.get('roleName').value;
    this['refRoleData']['roleDesc'] = this.editRoleForm.value.roleDesc;
    this['refRoleData']['privileges'] = this.editRoleForm.value.privileges.toString();
    this['refRoleData']['functionaries'] = this.editRoleForm.value.functionality.toString();
    this.privilegeData = this.editRoleForm.value.privileges;
    this.funcData = this.editRoleForm.value.functionality;

    // get privilegeList and functionalityList
    try {
      await this.createPrivilegesList();
      try {
        await this.createFunctionalityList();
        this.callForUpdate(this.privilegeList, this.funcList);
      } catch (FuncError) {
      }
    } catch (privilegError) {
    }
  }

  callForUpdate(privList, funcList) {
    console.log("this.roleData['id']",this.roleData['id']);
    this.apiService.postTypeRequest('/admin/crud', this.createData(this.editRoleForm.value.roleName, this.editRoleForm.value.roleDesc, privList, funcList, this.roleData['roleId'])).subscribe(resp => {
      if (resp['isError'] === false) {
        this.successMsg = true;
        setTimeout(() => {
          this.cancel();
        }, 5000);
      }
    }, err => {
      console.log(err, 'hhhh');
    });
  }

  cancel() {
    this.cancelEvent.emit();
    this.successMsg = false;
    setTimeout(() => {
      this.submitted = false;
    }, 500);
  }


  searchDataApi(entityName, key, value) {
    let commonParamHash = {};
    commonParamHash['entityName'] = entityName;
    commonParamHash['operation'] = 'SEARCH';
    let objectHash = {};
    objectHash[key] = value;
    let data = {};
    data['commonParamHash'] = commonParamHash;
    data['objectHash'] = objectHash;
    return data;
  }
}

