import { LoginPage } from "../pageObject/loginPage"
import data from "../support/testData"

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
  const loginPage = new LoginPage();

    it(`TC ${testCaseNr++} Verify Password Masking`, () => {
      cy.visitSauceDemo();
      loginPage.typePassword(data.validPwd);
      loginPage.verifyPwdMasking();
  });

    it(`TC ${testCaseNr++} Verify Absence SQL Injection in Login`, () => {
      cy.visitSauceDemo();
      loginPage.login('\' OR 1=1 --', data.validPwd);  
      loginPage.verifyErrorVisibility();
      loginPage.verifyErrorMsg(data.msgWrongLoginData);
  });

  it(`TC ${testCaseNr++} Verify Prevention of XSS Injection in Login `, () => {
      cy.visitSauceDemo();
      loginPage.login('<script>alert("XSS")</script>', data.validPwd);
      cy.on('window:alert', (txt) => {
          expect(txt).not.to.equal('XSS');
      });
      cy.contains('XSS').should('not.exist');
      loginPage.verifyErrorVisibility();
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
          loginPage.verifyErrorVisibility();
      });   
  });

  urls.forEach((eachUrl) => {
      it(`TC ${testCaseNr++} Check for a 404 Error for Invalid URL ${eachUrl}`, () => {
          cy.request({ url: eachUrl, failOnStatusCode: false}).then((response) => {expect(response.status).to.eq(404);
          });
      });
  });
})
