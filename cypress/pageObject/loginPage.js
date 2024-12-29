import { BasePage } from "./basePage";
import data from "../support/testData"

export class LoginPage extends BasePage {
    constructor() {
        super();
        this.usrLoginPage = '[data-test=username]';
        this.pwdLoginPage = '[data-test=password]';
        this.loginBtn = '[data-test=login-button]';
        this.errorMsg = '[data-test="error"]';
        this.deleteErrorMsgIcon = '[data-test=error-button]';
        this.menuBtn = '#react-burger-menu-btn';
        this.logoutSidebar = '[data-test=logout-sidebar-link]';
        
    }

    verifyErrorVisibility() {
        this.getElement(this.errorMsg).should('be.visible');  
    }
    
    typeUsername(usr) {
        this.getElement(this.usrLoginPage).type(usr)
    }

    typePassword(pwd) {
        this.getElement(this.pwdLoginPage).type(pwd)
    }

    verifyPwdMasking (){
        this.getElement(this.pwdLoginPage).invoke('attr', 'type').should('eq', 'password')
    }

    login(usr, pwd) {
        if(usr !== undefined) this.typeUsername(usr);
        if(pwd !== undefined) this.typePassword(pwd);
        this.getElement(this.loginBtn).click();
    }

    visitSauceDemoInventoryPage (usr, pwd) {
        this.login(usr, pwd);
        cy.url().should('include', data.inventoryPageUrl)
    }

    verifyErrorMsg(text) {
        this.getElement(this.errorMsg).should('contain.text', text)
        .and('not.contain', 'SQL')
        .and('not.contain', 'syntax')
        .and('not.contain', 'database')
        .and('not.contain', 'query')
        .and('not.contain', 'table')
        .and('not.contain', 'column')
        .and('not.contain', 'SELECT')
        .and('not.contain', 'INSERT')
        .and('not.contain', 'UPDATE')
        .and('not.contain', 'DELETE')
        .and('not.contain', 'FROM')
        .and('not.contain', 'WHERE');
    }

    deleteAndVerifyErrMsg () {
        this.getElement(this.deleteErrorMsgIcon).click();
        this.getElement(this.errorMsg).should('not.exist');
    }

    clickMenuBtn = () => {
       this.getElement(this.menuBtn).click();
      };
      
    logoutAndVerify = () => {
        this.getElement(this.logoutSidebar).click({force: true});
        cy.url().should('eq', data.loginPageUrl); 
        cy.contains(data.labelProducts).should('not.exist');  
        this.getElement(this.loginBtn).should('not.be.disabled');
      };
      
}