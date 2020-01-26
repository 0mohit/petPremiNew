import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  businessCategory = [
    "Beauty & Personal Care",
    "Charities, Education & Membership",
    "Hospitality",
    "Health Care",
    "Home and  Repair",
    "Entertainment",
    "Professional Services",
    "Retails",
    "Transportation",
    "Casual"
  ];
  subBusinessCategory = [
    "Art, Photo & Film",
    "Books, Mags, Music & Video",
    "Clothing & Accessories",
    "Convenience Store",
    "Electronics",
    "Eyewear",
    "Flowers & Gifts",
    "Furniture/Home Goods",
    "Hardware Store",
    "Hobby Shop",
    "Jewelry & Watches",
    "Office Supply",
    "Outdoor Markets",
    "Pet Store",
    "Speciality Shop",
    "Sporting Goods",
    "Other"
  ];
  businessEntity = [
    "Proprietorship",
    "Individual",
    "Partnership",
    "Private Limited",
    "Public Limited",
    "LLP",
    "Educational Institute",
    "Trust",
    "NGO",
    "Societies",
    "Compuslive - Education",
    "Compuslive - Utility",
    "Compuslive - Trust"
  ];
  roles = ["Owner", "Partner", "Director", "Authorized Signatory", "Trustee"];
  identityProofAddressProof = [
    "Voter Id",
    "Driving License",
    "PAN Card",
    "Passport"
  ];
  banks = [
    "THE AURANGABAD DISTRICT CENTRAL COOP BANK LIMITED",
    "DR. AMBEDKAR NAGRIK SAHAKARI BANK MYDT., GWALIOR",
    "THE ANDHRA BANK EMPLOYEES CO OPERATIVE BANK LTD",
    "ABHYUDAYA CO-OPERATIVE BANK",
    "THE ROYAL BANK OF SCOTLAND",
    "THE ABHINAV SAHAKARI BANK LIMITED",
    "THE ASSAM COOPERATIVE APEX BANK LTD",
    "ADARSH CO-OPERATIVE BANK LTD",
    "ANNASAHEB CHOUGULE URBAN CO-OP BANK LTD.",
    "THE ARYAPURAM COOPERATIVE URBAN BANK LTD",
    "THE ADARSH COOPERATIVE URBAN BANK LIMITED",
    "THE AHMEDABAD DISTRICT CO-OPERATIVE BANK LTD",
    "ABU DHABI COMMERCIAL BANK",
    "THE AKOLA DISTRICT CENTRAL COOPERATIVE BANK LTD",
    "SHRI ADINATH CO-OP.BANK LTD."
  ];
  constructor() {}

  restrictDateNumeric(e) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33 || e.which === 47 || e.which === 46 || e.which === 45) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  restrictOnlyNumeric(e) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  restrictOnlyAlphaNumeric(e) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (
      (e.which > 47 && e.which < 58) ||
      (e.which > 64 && e.which < 91) ||
      (e.which > 96 && e.which < 123)
    ) {
      return true;
    }
    input = String.fromCharCode(e.which);
    const letterNumber = /^[0-9a-zA-Z]+$/;
    return !!letterNumber.test(input);
  }
}
