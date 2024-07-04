import data from "../support/pageObject/dataPage.js";  
import {
    addBackpackToCart,
    addBikeToCart,
    clickAllItemsSidebar,
    clickMenuBtn,
    goToCart,
    removeBackpackFromCart,
    removeBikeFromCart,
    verifyProductsListLength,
    verifyProductDetails,
    visitSauceDemoInventoryPage,
    verifyProductQuantityInCart,
    verifyBadgeQuantity,
    goToFirstCheckoutPage,
    verifyDetailInformationAboutAddProducts,
    addBackpackAndBikeToCart,
    verifyEmptyCartBadge,
    verifyEmptyCartList,
    verifyContainsVisibility,
    goBackToContinueShopping
  } from '../support/pageObject/functionsPage.js';

describe('Shopping Cart Functionality', () => {
  data.viewports.forEach(viewport => {
    context(`Viewport: ${viewport.device}`, () => {
      let testCaseNr = 1;

      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
        cy.visitSauceDemo();
        visitSauceDemoInventoryPage(data.validUsr, data.validPwd); 
      });

      it(`TC ${testCaseNr++} Verify Adding Products to Cart`, () => {
        addBackpackAndBikeToCart(data.remove);
        goToCart();
        verifyProductDetails();
        verifyDetailInformationAboutAddProducts(
          data.orderOfProducts[0], 
          data.orderOfProducts[1],
          data.productsPrice[0],
          data.productsPrice[1]
        );
      });

      it(`TC ${testCaseNr++} Verify Product Details in Cart`, () => {
        addBackpackAndBikeToCart(data.remove);
        goToCart();
        verifyProductsListLength(2);
        verifyProductQuantityInCart(1);
      });
    
      it(`TC ${testCaseNr++}. Verify Removing Products from Cart`, () => {
        addBackpackAndBikeToCart(data.remove);
        goToCart();
        removeBackpackFromCart();
        verifyProductsListLength(1);
        removeBikeFromCart();
        verifyEmptyCartList();
      });

      it(`TC ${testCaseNr++} Verify Cart Count Badge`, () => {
        addBackpackToCart(data.remove);
        goToCart();
        verifyBadgeQuantity(1);
        clickMenuBtn();
        clickAllItemsSidebar();
        addBikeToCart(data.remove);
        goToCart();
        verifyBadgeQuantity(2);
        removeBackpackFromCart();
        verifyBadgeQuantity(1);
        removeBikeFromCart();
        verifyEmptyCartBadge();
      });
    
      it(`TC ${testCaseNr++} Verify Checkout Process`, () => {
        addBackpackToCart(data.remove);
        goToCart();
        goToFirstCheckoutPage();
        verifyContainsVisibility(data.titleYourInformation);
      });

      it(`TC ${testCaseNr++} Verify Returning to the List of Products from Cart`, () => {
        goToCart();
        goBackToContinueShopping();
      });
    });
  });
});