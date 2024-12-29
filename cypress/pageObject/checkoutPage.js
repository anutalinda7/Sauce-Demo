import data from "../support/testData"
import { CartFunctionality } from "./cartFunctionalityPage";

export class CheckoutProcess extends CartFunctionality {
    constructor() {
        super();
        this.firstNameCheckoutPage = '[data-test=firstName]';
        this.lastNameCheckoutPage = '[data-test=lastName]';
        this.zipCodeCheckoutPage = '[data-test=postalCode]';
        this.cancelBtnCheckoutPage = '[data-test=cancel]';
        this.continueBtnCheckoutPage = '[data-test=continue]';
        this.itemsTotalPrice = '[data-test=subtotal-label]';
        this.tax = '[data-test=tax-label]';
        this.totalPriceWithTax = '[data-test=total-label]';
        this.finishBtnCheckoutPage = '[data-test="finish"]';
        this.goBackHomeBtn = '[data-test=back-to-products]';
    }
    
    checkErrorText (text) {
      this.getElement(this.errorMsg).should('have.text', text);
    };
    
   fillYourInformation (fn, ln, zc) {
      if (fn !== undefined) this.getElement(this.firstNameCheckoutPage).type(fn);
      if (ln !== undefined) this.getElement(this.lastNameCheckoutPage).type(ln);
      if (zc!== undefined) this.getElement(this.zipCodeCheckoutPage).type(zc);
    };
    
    fillYourInformationAndCheckError (fn, ln, zc, err) {
      this.fillYourInformation(fn, ln, zc);
      this.getElement(this.continueBtnCheckoutPage).click();
      this.checkErrorText(err);
    };
    
    clickContinueBtnCheckoutPage () {
      this.getElement(this.continueBtnCheckoutPage).click();
      cy.url().should('include', data.checkoutStepTwoPageUrl);
    };
    
    
    goToFinishCheckoutPage () {
      this.getElement(this.finishBtnCheckoutPage).click();
      cy.url().should('include', data.checkoutCompletePageUrl);
    };
    
    goBackToHomePage () {
      this.getElement(this.goBackHomeBtn).click();
      cy.url().should('include', data.inventoryPageUrl);
      cy.contains('Products').should('be.visible');
    };
    
    clickCancelCheckoutBtn () {
      this.getElement(this.cancelBtnCheckoutPage).click();
    };
      
}