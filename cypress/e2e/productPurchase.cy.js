import { LoginPage } from "../pageObject/loginPage"
import data from "../support/testData"

const loginData = [
  { usr: data.lockedOutUsr, pwd: data.validPwd, err: data.msgRequiredLockedUsr },
  { usr: data.invalidUsr, pwd: data.validPwd, err: data.msgWrongLoginData },
  { usr: data.validUsr, pwd: data.invalidPwd, err: data.msgWrongLoginData },
  { usr: data.invalidUsr, pwd: data.invalidPwd, err: data.msgWrongLoginData },
  { usr: undefined, pwd: data.validPwd, err: data.msgRequiredUsr },
  { usr: data.validUsr, pwd: undefined, err: data.msgRequiredPwd },
  { usr: undefined, pwd: undefined, err: data.msgRequiredUsr }
];

describe('Product purchase', () => {
  const loginPage = new LoginPage();

  data.viewports.forEach(viewport => {
    context(`Viewport: ${viewport.device}`, () => {
      let testCaseNr = 1;
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
        cy.visitSauceDemo();
      });

      it(`TC ${testCaseNr++}: Successful Login`, () => {
        loginPage.login(data.validUsr, data.validPwd);
        loginPage.verifyContainsVisibility(data.labelProducts);  
      });

      loginData.forEach(({ usr, pwd, err }) => {
        it(`TC ${testCaseNr++}: Login with Locked Out User, Invalid User, or Empty Information and Check the Message`, () => {
          loginPage.login(usr, pwd); 
          loginPage.verifyErrorMsg(err);
        }); 
      });

      it(`TC ${testCaseNr++}: Verify Correct Logout`, () => {
        loginPage.login(data.validUsr, data.validPwd);
        loginPage.clickMenuBtn();
        loginPage.logoutAndVerify();
      });

      it(`TC ${testCaseNr++}: Check the Disabled Error Message Using the Delete Icon`, () => {
        loginPage.login(data.invalidUsr, data.validPwd);  
        loginPage.verifyErrorMsg(data.msgWrongLoginData);
        loginPage.deleteAndVerifyErrMsg();
      });
    });
  });
});
