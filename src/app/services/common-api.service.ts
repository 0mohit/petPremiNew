import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  constructor() { }


  deleteEntryFromTable(entityName, key, value) {
    let commonParamHash = {};
    commonParamHash['entityName'] = entityName;
    commonParamHash['operation'] = 'DELETE';
    let objectHash = {};
    objectHash[key] = value;
    let data = {};
    data['commonParamHash'] = commonParamHash;
    data['objectHash'] = objectHash;
    return data;
  }

  getRecords(entityName) {
    let commonParamHash = {};
    commonParamHash['entityName'] = entityName;
    commonParamHash['operation'] = 'READ';
    let data = {};
    data['commonParamHash'] = commonParamHash;
    return data;
  }
}
