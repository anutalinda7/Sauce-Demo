import { LoginPage } from "./loginPage";

export class ProductBrowsing extends LoginPage {
    constructor() {
        super();
        this.allItemsSidebar = '[data-test=inventory-sidebar-link]';
        this.productsSection = '[data-test=inventory-container]';
        this.listItem = '[data-test=inventory-item]';
        this.productItem = '.inventory_item';
        this.itemQuantity = '[data-test=item-quantity]';
        this.sortContainer = '[data-test=product-sort-container]';
        this.selectAZ = 'az';
        this.selectZA = 'za';
        this.selectHiLo = 'hilo';
        this.selectLoHi = 'lohi';
        this.itemName = '.inventory_item_name';
        this.itemPrice = '.inventory_item_price';
        this.itemImg = '.inventory_item_img';
        this.productDetailsName = '[data-test=inventory-item-name]';
        this.productDetailsPrice = '[data-test=inventory-item-price]';
        this.productDetailsDesc = '[data-test=inventory-item-desc]';
        this.productDetailsImg = '.inventory_details_img';
        this.addToCartBtnFromDetails = '[data-test=add-to-cart]';
        this.removeBtnFromDetails = '[data-test=remove]';
        this.addToCartBackpackProduct = '[data-test=add-to-cart-sauce-labs-backpack]';
        this.addToCartBikeProduct = '[data-test=add-to-cart-sauce-labs-bike-light]';
        this.removeBackpackProduct = '[data-test=remove-sauce-labs-backpack]';
        this.removeBikeProduct = '[data-test=remove-sauce-labs-bike-light]';
        this.goToCartBtn = '[data-test=shopping-cart-link]';
    }

    verifyProductsListLength (number) {
        this.getElement(this.listItem).should('have.length', number);
      };
      
    verifyProductsInfBrowsingPage () {
        this.getElement(this.productItem).each(($el) => {
          cy.wrap($el).find(this.itemName).should('be.visible');
          cy.wrap($el).find(this.itemPrice).should('be.visible');
          cy.wrap($el).find(this.itemImg).should('be.visible');
        });
      };
      
    verifyProductsOrder (expectOrder) {
        this.getElement(this.productItem).each(($el, index) => {
        cy.wrap($el).find(this.itemName).should('have.text', expectOrder[index]);
          });
      }; 
      
    goToProductDetailsPage (nr) {
        this.getElement(this.itemName).eq(nr).click();
      };
      
    verifyProductDetails () {
        this.getElement(this.productDetailsName).should('be.visible');
        this.getElement(this.productDetailsPrice).should('be.visible');
        this.getElement(this.productDetailsDesc).should('be.visible');
      };
      
    addProductToCartAndVerify (text, url) {
        this.getElement(this.productDetailsImg).should('be.visible');
        this.getElement(this.addToCartBtnFromDetails).click();
        this.getElement(this.removeBtnFromDetails).should('have.text', text);
        this.getElement(this.goToCartBtn
        ).click();
        cy.url().should('include', url);
        this.verifyProductDetails();
      };
      
    selectSortOption (select) {
        this.getElement(this.sortContainer).select(select);
      };
      
    verifySortingOrder (select) {
        this.selectSortOption(select);
         if(select === this.selectAZ || select === this.selectZA){
            const reverse = select === this.selectZA;
            this.getElement(this.itemName).then(items => {
                const names = [...items].map(item => item.innerText);
                const sortedNames = [...names].sort();
                if (reverse) {sortedNames.reverse()} 
                expect(names).to.deep.equal(sortedNames);
              });
         } else if (select === this.selectHiLo || select === this.selectLoHi){
            const highToLow = select === this.selectLoHi;
            this.getElement(this.itemPrice).then(items => {
              const prices = [...items].map(item => parseFloat(item.innerText.replace('$', '')));
              const sortedPrices = [...prices].sort((a, b) => highToLow ?  a - b : b - a);
              expect(prices).to.deep.equal(sortedPrices);
            });    
         }
        };

    clickAllItemsSidebar () {
          this.getElement(this.allItemsSidebar).click();
      };
      
}