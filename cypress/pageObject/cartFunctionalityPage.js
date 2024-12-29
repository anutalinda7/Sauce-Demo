import data from "../support/testData"
import { ProductBrowsing } from "./productBrowsingPage";

export class CartFunctionality extends ProductBrowsing {
    constructor() {
        super();
        this.quantityCartBadge = '[data-test=shopping-cart-badge]';
        this.checkoutBtn = '[data-test=checkout]';
        this.continueShopingBtn = '[data-test=continue-shopping]';
    }
      
      addBackpackToCart (txt) {
        this.getElement(this.addToCartBackpackProduct).click();
        this.getElement(this.removeBackpackProduct).should('have.text', txt);
      };
      
      addBikeToCart (txt) {
        this.getElement(this.addToCartBikeProduct).click();
        this.getElement(this.removeBikeProduct).should('have.text', txt);
      };
      
      addBackpackAndBikeToCart (txt) {
        this.addBackpackToCart(txt);
        this.addBikeToCart(txt);
      };
      
      removeBackpackFromCart () {
        this.getElement(this.removeBackpackProduct).click();
      };
      
      removeBikeFromCart () {
        this.getElement(this.removeBikeProduct).click();
      };
      
      goToCart () {
        this.getElement(this.goToCartBtn).click();
          cy.url().should('include', data.cartPageUrl);
      };
      
      verifyProductQuantityInCart (nr) {
        this.getElement(this.itemQuantity).each(($el) => {
            cy.wrap($el).should("have.text", nr);
        });
      };
      
      verifyEmptyCartList () {
        this.getElement(this.listItem).should('not.exist');
      };
      
      verifyEmptyCartBadge () {
        this.getElement(this.quantityCartBadge).should('not.exist');
      };
      
      verifyBadgeQuantity (text) {
        this.getElement(this.quantityCartBadge).should('have.text', text);
      };
      
      goBackToContinueShopping () {
        this.getElement(this.continueShopingBtn).click();
        cy.url().should('include', data.inventoryPageUrl);
      };

      verifyDetailInformationAboutAddProducts (firstProductName, secondProductName, firstProductPrice, secondProductPrice) {
        cy.contains(firstProductName).should('be.visible');
        cy.contains(secondProductName).should('be.visible');
        this.getElement(this.productDetailsPrice).first().should('have.text' , `$${firstProductPrice}`);
        this.getElement(this.productDetailsPrice).last().should('have.text' , `$${secondProductPrice}`);
      };

      goToFirstCheckoutPage () {
        this.getElement(this.checkoutBtn).click();
        cy.url().should('include', data.checkoutStepOnePageUrl);
      };
      
}