import data from "../support/pageObject/dataPage.js";
import selector from "../support/pageObject/selectorsPage.js";
import {
  addBackpackAndBikeToCart,
  addBackpackToCart,
  clickCancelCheckoutBtn,
  clickContinueBtnCheckoutPage,
  fillYourInformation,
  fillYourInformationAndCheckError,
  goBackToHomePage,
  goToCart,
  goToFinishCheckoutPage,
  goToFirstCheckoutPage,
  verifyContainsVisibility,
  verifyDetailInformationAboutAddProducts,
  verifyProductDetails,
  visitSauceDemoInventoryPage
} from '../support/pageObject/functionsPage.js';

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
  data.viewports.forEach(viewport => {
    context(`Viewport: ${viewport.device}`, () => {
      let testCaseNumber = 1;
      
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
        cy.visitSauceDemo();
        visitSauceDemoInventoryPage(data.validUsr, data.validPwd);
      });

      it(`TC ${testCaseNumber++} Verify Complete the Checkout Process and Place an Order`, () => {
        addBackpackAndBikeToCart(data.remove);
        goToCart();
        goToFirstCheckoutPage();
        fillYourInformation(data.fn, data.ln, data.zc);
        clickContinueBtnCheckoutPage();
        verifyProductDetails();
        goToFinishCheckoutPage();
        verifyContainsVisibility(data.msgThankYouForOrder);
      });

      it(`TC ${testCaseNumber++} Verify Price Calculation and Tax`, () => {
        addBackpackAndBikeToCart(data.remove);
        goToCart();
        goToFirstCheckoutPage();
        fillYourInformation(data.fn, data.ln, data.zc);
        clickContinueBtnCheckoutPage();
        verifyDetailInformationAboutAddProducts(
          data.orderOfProducts[0],
          data.orderOfProducts[1],
          data.productsPrice[0],
          data.productsPrice[1]
        );
        cy.getBySel(selector.itemsTotalPrice).should('have.text', `Item total: $${totalItemPrice.toFixed(2)}`);
        cy.getBySel(selector.tax).should('have.text', `Tax: $${expectedTax.toFixed(2)}`);
        cy.getBySel(selector.totalPriceWithTax).should('have.text', `Total: $${totalPrice.toFixed(2)}`);
        goToFinishCheckoutPage();
      });

      incompleteInfoTests.forEach(({ fn, ln, zc, err }) => {
        it(`TC ${testCaseNumber++} Checkout with incomplete Information`, () => {
          addBackpackToCart(data.remove);
          goToCart();
          goToFirstCheckoutPage();
          fillYourInformationAndCheckError(fn, ln, zc, err);
        });
      });

      it(`TC ${testCaseNumber++} Cancel Checkout from the Checkout: Your Information Page`, () => {
        addBackpackToCart(data.remove);
        goToCart();
        goToFirstCheckoutPage();
        clickCancelCheckoutBtn();
        cy.url().should('include', '/cart.html');
      });

      it(`TC ${testCaseNumber++} Cancel Checkout from the Checkout: Overview Page`, () => {
        addBackpackToCart(data.remove);
        goToCart();
        goToFirstCheckoutPage();
        fillYourInformation(data.fn, data.ln, data.zc);
        clickContinueBtnCheckoutPage();
        clickCancelCheckoutBtn();
        cy.url().should('include', '/inventory.html');
      });

      it(`TC ${testCaseNumber++} Go Back Home After Order`, () => {
        addBackpackToCart(data.remove);
        goToCart();
        goToFirstCheckoutPage();
        fillYourInformation(data.fn, data.ln, data.zc);
        clickContinueBtnCheckoutPage();
        goToFinishCheckoutPage();
        goBackToHomePage();
      });
    });
  });
});