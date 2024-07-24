import data from "../support/dataPage.js";  
import selector from "../support/selectorsPage.js";  
import { login, typePassword, verifyContainsVisibility, verifyErrorMsg, verifyPwdMasking } from '../support/functionsPage.js';

const urls = [
    'https://www.saucedemo.com/inventory.html',
    'https://www.saucedemo.com/inventory-item.html?id=4',
    'https://www.saucedemo.com/cart.html',
    'https://www.saucedemo.com/checkout-step-one.html',
    'https://www.saucedemo.com/checkout-step-two.html',
    'https://www.saucedemo.com/checkout-complete.html'
  ];
  let testCaseNr = 1;

describe('Security', () => {
  
      it(`TC ${testCaseNr++} Verify Password Masking`, () => {
        cy.visitSauceDemo();
        typePassword(data.validPwd);
        verifyPwdMasking();
    });

      it(`TC ${testCaseNr++} Verify Absence SQL Injection in Login`, () => {
        cy.visitSauceDemo();
        login('\' OR 1=1 --', data.validPwd);  
        verifyContainsVisibility(selector.errorMsg);
        verifyErrorMsg(data.msgWrongLoginData);
    });

    it(`TC ${testCaseNr++} Verify Prevention of XSS Injection in Login `, () => {
        cy.visitSauceDemo();
        login('<script>alert("XSS")</script>', data.validPwd);
        cy.on('window:alert', (txt) => {
            expect(txt).not.to.equal('XSS');
        });
        cy.contains('XSS').should('not.exist');
        verifyContainsVisibility(selector.errorMsg);
    });

    it(`TC ${testCaseNr++} Verify HTTPS in Login url`, () => {
        cy.visitSauceDemo();
        cy.location('protocol').should('eq', 'https:');
    });

    urls.forEach((eachUrl) => {
        it(`TC ${testCaseNr++} Verify HTTPS for URL ${eachUrl}`, () => {
            cy.visit(eachUrl, { failOnStatusCode: false });
            cy.location('protocol').should('eq', 'https:');
        });
    });
    
    urls.forEach((eachUrl) => {
        it(`TC ${testCaseNr++} All Critical Pages Display an Access Denied Message when Bypassing Login for the URL ${eachUrl}`, () => {
            cy.visit(eachUrl, { failOnStatusCode: false });
            verifyContainsVisibility(selector.errorMsg);
        });   
    });

    urls.forEach((eachUrl) => {
        it(`TC ${testCaseNr++} Check for a 404 Error for Invalid URL ${eachUrl}`, () => {
            cy.request({ url: eachUrl, failOnStatusCode: false}).then((response) => {expect(response.status).to.eq(404);
            });
        });
    });
})
