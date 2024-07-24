import data from "../support/dataPage.js";  
import selector from "../support/selectorsPage.js";  
import {
  clickAllItemsSidebar,
  clickMenuBtn,
  verifyProductsListLength,
  verifyProductDetails,
  visitSauceDemoInventoryPage,
  verifySortingOrder,
  verifyProductsInfBrowsingPage,
  verifyProductsOrder,
  addProductToCartAndVerify,
  goToProductDetailsPage
} from '../support/functionsPage.js';

const sortingChoice = [
  selector.selectAZ,
  selector.selectZA,
  selector.selectLoHi,
  selector.selectHiLo
];

describe('Product Browsing and Selection', () => {
  data.viewports.forEach(viewport => {
    context(`Viewport: ${viewport.device}`, () => {
      let testCaseNr = 1;

      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
        cy.visitSauceDemo();
        visitSauceDemoInventoryPage(data.validUsr, data.validPwd); 
      });

      it(`TC ${testCaseNr++} Verify the Number of Products Listed and Compare with the Expected Count`, () => {
        verifyProductDetails();
      });

      it(`TC ${testCaseNr++} Verify Product List`, () => {
        verifyProductsInfBrowsingPage();
      });

      it(`TC ${testCaseNr++} Ensure the Products are Correctly Categorized`, () => {
        verifyProductsOrder(data.orderOfProducts);
      });

      sortingChoice.forEach((i) => {
        it(`TC ${testCaseNr++} Validate Sorting Functionality`, () => {
          verifySortingOrder(i);
        });
      });

      it(`TC ${testCaseNr++} Check Product Details`, () => {
        goToProductDetailsPage(0);
        verifyProductDetails();
        verifyProductsListLength(1);
        addProductToCartAndVerify(data.remove, data.cartPageUrl);
      });

      it(`TC ${testCaseNr++} Test Navigation`, () => {
        clickMenuBtn();
        clickAllItemsSidebar();
        verifyProductDetails();
        verifyProductsListLength(6);
      });
    });
  });
});
