import { LoginPage } from "../pageObject/loginPage"
import { CartFunctionality } from "../pageObject/cartFunctionalityPage"
import data from "../support/testData"

describe('Shopping Cart Functionality', () => {
  const loginPage = new LoginPage();
  const cartFunctionality = new CartFunctionality();

  data.viewports.forEach(viewport => {
    context(`Viewport: ${viewport.device}`, () => {
      let testCaseNr = 1;

      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
        cy.visitSauceDemo();
        loginPage.visitSauceDemoInventoryPage(data.validUsr, data.validPwd); 
      });

      it(`TC ${testCaseNr++} Verify Adding Products to Cart`, () => {
        cartFunctionality.addBackpackAndBikeToCart(data.remove);
        cartFunctionality.goToCart();
        cartFunctionality.verifyProductDetails();
        cartFunctionality.verifyDetailInformationAboutAddProducts(
          data.orderOfProducts[0], 
          data.orderOfProducts[1],
          data.productsPrice[0],
          data.productsPrice[1]
        );
      });

      it(`TC ${testCaseNr++} Verify Product Details in Cart`, () => {
        cartFunctionality.addBackpackAndBikeToCart(data.remove);
        cartFunctionality.goToCart();
        cartFunctionality.verifyProductsListLength(2);
        cartFunctionality.verifyProductQuantityInCart(1);
      });
    
      it(`TC ${testCaseNr++}. Verify Removing Products from Cart`, () => {
        cartFunctionality.addBackpackAndBikeToCart(data.remove);
        cartFunctionality.goToCart();
        cartFunctionality.removeBackpackFromCart();
        cartFunctionality.verifyProductsListLength(1);
        cartFunctionality.removeBikeFromCart();
        cartFunctionality.verifyEmptyCartList();
      });

      it(`TC ${testCaseNr++} Verify Cart Count Badge`, () => {
        cartFunctionality.addBackpackToCart(data.remove);
        cartFunctionality.goToCart();
        cartFunctionality.verifyBadgeQuantity(1);
        cartFunctionality.clickMenuBtn();
        cartFunctionality.clickAllItemsSidebar();
        cartFunctionality.addBikeToCart(data.remove);
        cartFunctionality.goToCart();
        cartFunctionality.verifyBadgeQuantity(2);
        cartFunctionality.removeBackpackFromCart();
        cartFunctionality.verifyBadgeQuantity(1);
        cartFunctionality.removeBikeFromCart();
        cartFunctionality.verifyEmptyCartBadge();
      });
    
      it(`TC ${testCaseNr++} Verify Checkout Process`, () => {
        cartFunctionality.addBackpackToCart(data.remove);
        cartFunctionality.goToCart();
        cartFunctionality.goToFirstCheckoutPage();
        cartFunctionality.verifyContainsVisibility(data.titleYourInformation);
      });

      it(`TC ${testCaseNr++} Verify Returning to the List of Products from Cart`, () => {
        cartFunctionality.goToCart();
        cartFunctionality.goBackToContinueShopping();
      });
    });
  });
});


