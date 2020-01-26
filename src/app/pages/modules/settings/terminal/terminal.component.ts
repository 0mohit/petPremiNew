import { HttpClient } from "@angular/common/http";
import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { merge, Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";

@Component({
  selector: "app-terminal",
  templateUrl: "./terminal.component.html",
  styleUrls: ["./terminal.component.scss"]
})
export class TerminalComponent implements AfterViewInit {
  columnNames = {
    "terminalId": "Terminal Id",
    "refNo": "Reference No.",
    "address": "Address",
    "partner": "Partner",
    "status": "Status"
  };
  displayedColumns: string[] = [
    "terminalId",
    "refNo",
    "address",
    "partner",
    "status"
  ];
  isClose = false;
  isDisplayForm = false;
  exampleDatabase: ExampleHttpDatabase | null;
  data = [];

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private _httpClient: HttpClient) {
  }

  addTerminal() {
    this.isDisplayForm = !this.isDisplayForm;
    this.isClose = !this.isClose;
  }

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex
          );
        }),
        map((data: any) => {
          console.log(data)
          this.isLoadingResults = false;
          this.resultsLength = data.length;
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      )
      .subscribe(data => (this.data = data));
  }
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(sort: string, order: string, page: number): Observable<any> {
    const requestUrl = "./assets/mockData/terminal.json";

    return this._httpClient.get<any>(requestUrl);
  }
}
