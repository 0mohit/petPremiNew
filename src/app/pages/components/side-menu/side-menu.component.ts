import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-side-menu",
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.scss"]
})
export class SideMenuComponent implements OnInit {
  year = new Date().getFullYear();
  isSubMenuOpen = false;
  isMenuOpen=true;
  iconColor='icon-color';
  constructor(
  ) {}

  ngOnInit() {}
  toggleSubMenu() {
    if( this.isMenuOpen){
      this.isSubMenuOpen = !this.isSubMenuOpen;
    }else{
      this.isSubMenuOpen =false;
    }
  }
  menuToggel() {
    if (
      document
        .getElementById("main-container")
        .classList.contains("sidemenu-open")
    ) {
      this.isMenuOpen=false;
      this['iconColor']=''
      document
        .getElementById("main-container")
        .classList.remove("sidemenu-open");
    } else {
      this['iconColor']='icon-color'
      this.isMenuOpen=true;
      document.getElementById("main-container").classList.add("sidemenu-open");
    }
    this.toggleSubMenu();
  }
}
