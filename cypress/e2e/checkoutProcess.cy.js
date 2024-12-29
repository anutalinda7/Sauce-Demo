import { LoginPage } from "../pageObject/loginPage"
import { CheckoutProcess } from "../pageObject/checkoutPage"
import data from "../support/testData"


const itemsPrice = [
  parseFloat(data.productsPrice[0]),
  parseFloat(data.productsPrice[1])
];
const taxRate = data.rate;
const totalItemPrice = itemsPrice.reduce((price, item) => (price + item), 0);
const expectedTax = taxRate * totalItemPrice;
const totalPrice = expectedTax + totalItemPrice;

const incompleteInfoTests = [
  { fn: undefined, ln: data.ln, zc: data.zc, err: data.fnErrCheckoutPage },
  { fn: data.fn, ln: undefined, zc: data.zc, err: data.lnErrCheckoutPage },
  { fn: data.fn, ln: data.ln, zc: undefined, err: data.zcErrCheckoutPage },
  { fn: undefined, ln: undefined, zc: data.zc, err: data.fnErrCheckoutPage },
  { fn: undefined, ln: data.ln, zc: undefined, err: data.fnErrCheckoutPage },
  { fn: data.fn, ln: undefined, zc: undefined, err: data.lnErrCheckoutPage },
  { fn: undefined, ln: undefined, zc: undefined, err: data.fnErrCheckoutPage }
];

describe('Checkout Process', () => {
  const loginPage = new LoginPage();
  const checkoutProcess = new CheckoutProcess();

  data.viewports.forEach(viewport => {
    context(`Viewport: ${viewport.device}`, () => {
      let testCaseNumber = 1;
      
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
        cy.visitSauceDemo();
        loginPage.visitSauceDemoInventoryPage(data.validUsr, data.validPwd);
      });

      it(`TC ${testCaseNumber++} Verify Complete the Checkout Process and Place an Order`, () => {
        checkoutProcess.addBackpackAndBikeToCart(data.remove);
        checkoutProcess.goToCart();
        checkoutProcess.goToFirstCheckoutPage();
        checkoutProcess.fillYourInformation(data.fn, data.ln, data.zc);
        checkoutProcess.clickContinueBtnCheckoutPage();
        checkoutProcess.verifyProductDetails();
        checkoutProcess.goToFinishCheckoutPage();
        checkoutProcess.verifyContainsVisibility(data.msgThankYouForOrder);
      });

      it(`TC ${testCaseNumber++} Verify Price Calculation and Tax`, () => {
        checkoutProcess.addBackpackAndBikeToCart(data.remove);
        checkoutProcess.goToCart();
        checkoutProcess.goToFirstCheckoutPage();
        checkoutProcess.fillYourInformation(data.fn, data.ln, data.zc);
        checkoutProcess.clickContinueBtnCheckoutPage();
        checkoutProcess.verifyDetailInformationAboutAddProducts(
          data.orderOfProducts[0],
          data.orderOfProducts[1],
          data.productsPrice[0],
          data.productsPrice[1]
        );
        checkoutProcess.getElement(checkoutProcess.itemsTotalPrice).should('have.text', `Item total: $${totalItemPrice.toFixed(2)}`);
        checkoutProcess.getElement(checkoutProcess.tax).should('have.text', `Tax: $${expectedTax.toFixed(2)}`);
        checkoutProcess.getElement(checkoutProcess.totalPriceWithTax).should('have.text', `Total: $${totalPrice.toFixed(2)}`);
        checkoutProcess.goToFinishCheckoutPage();
      });

      incompleteInfoTests.forEach(({ fn, ln, zc, err }) => {
        it(`TC ${testCaseNumber++} Checkout with incomplete Information`, () => {
          checkoutProcess.addBackpackToCart(data.remove);
          checkoutProcess.goToCart();
          checkoutProcess.goToFirstCheckoutPage();
          checkoutProcess.fillYourInformationAndCheckError(fn, ln, zc, err);
        });
      });

      it(`TC ${testCaseNumber++} Cancel Checkout from the Checkout: Your Information Page`, () => {
        checkoutProcess.addBackpackToCart(data.remove);
        checkoutProcess.goToCart();
        checkoutProcess.goToFirstCheckoutPage();
        checkoutProcess.clickCancelCheckoutBtn();
        cy.url().should('include', '/cart.html');
      });

      it(`TC ${testCaseNumber++} Cancel Checkout from the Checkout: Overview Page`, () => {
        checkoutProcess.addBackpackToCart(data.remove);
        checkoutProcess.goToCart();
        checkoutProcess.goToFirstCheckoutPage();
        checkoutProcess.fillYourInformation(data.fn, data.ln, data.zc);
        checkoutProcess.clickContinueBtnCheckoutPage();
        checkoutProcess.clickCancelCheckoutBtn();
        cy.url().should('include', '/inventory.html');
      });

      it(`TC ${testCaseNumber++} Go Back Home After Order`, () => {
        checkoutProcess.addBackpackToCart(data.remove);
        checkoutProcess.goToCart();
        checkoutProcess.goToFirstCheckoutPage();
        checkoutProcess.fillYourInformation(data.fn, data.ln, data.zc);
        checkoutProcess.clickContinueBtnCheckoutPage();
        checkoutProcess.goToFinishCheckoutPage();
        checkoutProcess.goBackToHomePage();
      });
    });
  });
});

















