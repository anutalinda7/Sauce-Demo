import data from "../support/dataPage.js";  
import { clickMenuBtn, deleteAndVerifyErrMsg, login, logoutAndVerify, verifyContainsVisibility, verifyErrorMsg } from '../support/functionsPage.js';

const loginData = [
  { usr: data.lockedOutUsr, pwd: data.validPwd, err: data.msgRequiredLockedUsr },
  { usr: data.invalidUsr, pwd: data.validPwd, err: data.msgWrongLoginData },
  { usr: data.validUsr, pwd: data.invalidPwd, err: data.msgWrongLoginData },
  { usr: data.invalidUsr, pwd: data.invalidPwd, err: data.msgWrongLoginData },
  { usr: undefined, pwd: data.validPwd, err: data.msgRequiredUsr },
  { usr: data.validUsr, pwd: undefined, err: data.msgRequiredPwd },
  { usr: undefined, pwd: undefined, err: data.msgRequiredUsr }
];

describe('User Login Functionality', () => {
  data.viewports.forEach(viewport => {
    context(`Viewport: ${viewport.device}`, () => {
      let testCaseNr = 1;
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
        cy.visitSauceDemo();
      });

      it(`TC ${testCaseNr++}: Successful Login`, () => {
        login(data.validUsr, data.validPwd);
        verifyContainsVisibility(data.labelProducts);  
      });

      loginData.forEach(({ usr, pwd, err }) => {
        it(`TC ${testCaseNr++}: Login with Locked Out User, Invalid User, or Empty Information and Check the Message`, () => {
          login(usr, pwd); 
          verifyErrorMsg(err);
        }); 
      });

      it(`TC ${testCaseNr++}: Verify Correct Logout`, () => {
        login(data.validUsr, data.validPwd);
        clickMenuBtn();
        logoutAndVerify();
      });

      it(`TC ${testCaseNr++}: Check the Disabled Error Message Using the Delete Icon`, () => {
        login(data.invalidUsr, data.validPwd);  
        verifyErrorMsg(data.msgWrongLoginData);
        deleteAndVerifyErrMsg();
      });
    });
  });
});