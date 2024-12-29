import { LoginPage } from "../pageObject/loginPage"
import { ProductBrowsing } from "../pageObject/productBrowsingPage"
import data from "../support/testData"

describe('Product Browsing and Selection', () => {
    const loginPage = new LoginPage();
    const productBrowsing = new ProductBrowsing();
    
    const sortingChoice = [
      productBrowsing.selectAZ,
      productBrowsing.selectZA,
      productBrowsing.selectLoHi,
      productBrowsing.selectHiLo
    ];

  data.viewports.forEach(viewport => {
    context(`Viewport: ${viewport.device}`, () => {
      let testCaseNr = 1;

      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
        cy.visitSauceDemo();
        loginPage.visitSauceDemoInventoryPage(data.validUsr, data.validPwd); 
      });

      it(`TC ${testCaseNr++} Verify the Number of Products Listed and Compare with the Expected Count`, () => {
        productBrowsing.verifyProductDetails();
      });

      it(`TC ${testCaseNr++} Verify Product List`, () => {
        productBrowsing.verifyProductsInfBrowsingPage();
      });

      it(`TC ${testCaseNr++} Ensure the Products are Correctly Categorized`, () => {
        productBrowsing.verifyProductsOrder(data.orderOfProducts);
      });

      sortingChoice.forEach((i) => {
        it(`TC ${testCaseNr++} Validate Sorting Functionality`, () => {
            productBrowsing.verifySortingOrder(i);
        });
      });

      it(`TC ${testCaseNr++} Check Product Details`, () => {
        productBrowsing.goToProductDetailsPage(0);
        productBrowsing.verifyProductDetails();
        productBrowsing.verifyProductsListLength(1);
        productBrowsing.addProductToCartAndVerify(data.remove, data.cartPageUrl);
      });

      it(`TC ${testCaseNr++} Test Navigation`, () => {
        productBrowsing.clickMenuBtn();
        productBrowsing.clickAllItemsSidebar();
        productBrowsing.verifyProductDetails();
        productBrowsing.verifyProductsListLength(6);
      });
    });
  });
});