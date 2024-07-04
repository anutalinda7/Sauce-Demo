import data from "./dataPage.js"; 
import selector from "./selectorsPage.js"; 

// Reusable functions
export const verifyContainsVisibility = (contains) => {
  cy.contains(contains).should('be.visible');  
}

// Functions for Login Page
export const typeUsername = (usr) => {
  cy.getBySel(selector.usrLoginPage).type(usr);
};

export const typePassword = (pwd) => {
  cy.getBySel(selector.pwdLoginPage).type(pwd);
};

export const verifyPwdMasking = () => {
  cy.getBySel(selector.pwdLoginPage).invoke('attr', 'type').should('eq', 'password');
};

export const login = (usr, pwd) =>{
  if (usr !== undefined) typeUsername(usr);
  if (pwd !== undefined) typePassword(pwd);
  cy.getBySel(selector.loginBtn).click();
};

export const visitSauceDemoInventoryPage = (usr, pwd) => {
  login(usr, pwd);
  cy.url().should('include', data.inventoryPageUrl);
};

export const verifyErrorMsg = (text) => {
  cy.getBySel(selector.errorMsg).should('contain.text', text)
  .and('not.contain', 'SQL')
  .and('not.contain', 'syntax')
  .and('not.contain', 'database')
  .and('not.contain', 'query')
  .and('not.contain', 'table')
  .and('not.contain', 'column')
  .and('not.contain', 'SELECT')
  .and('not.contain', 'INSERT')
  .and('not.contain', 'UPDATE')
  .and('not.contain', 'DELETE')
  .and('not.contain', 'FROM')
  .and('not.contain', 'WHERE');
};

export const deleteAndVerifyErrMsg = () => {
  cy.getBySel(selector.deleteErrorMsgIcon).click();
  cy.getBySel(selector.errorMsg).should('not.exist');
};

export const clickMenuBtn = () => {
  cy.get(selector.menuBtn).click();
};

export const logoutAndVerify = () => {
  cy.getBySel(selector.logoutSidebar).click({force: true});
  cy.url().should('eq', data.loginPageUrl); 
  cy.contains(data.labelProducts).should('not.exist');  
  cy.getBySel(selector.loginBtn).should('not.be.disabled');
};

// Functions for Product Browsing Page
export const verifyProductsListLength = (number) => {
  cy.getBySel(selector.listItem).should('have.length', number);
};

export const verifyProductsInfBrowsingPage = () => {
  cy.get(selector.productItem).each(($el) => {
    cy.wrap($el).find(selector.itemName).should('be.visible');
    cy.wrap($el).find(selector.itemPrice).should('be.visible');
    cy.wrap($el).find(selector.itemImg).should('be.visible');
  });
};

export const verifyProductsOrder = (expectOrder) => {
  cy.get(selector.productItem).each(($el, index) => {
  cy.wrap($el).find(selector.itemName).should('have.text', expectOrder[index]);
    });
}; 

export const goToProductDetailsPage = (nr) => {
  cy.get(selector.itemName).eq(nr).click();
};

export const verifyProductDetails = () => {
  cy.getBySel(selector.productDetailsName).should('be.visible');
  cy.getBySel(selector.productDetailsPrice).should('be.visible');
  cy.getBySel(selector.productDetailsDesc).should('be.visible');
};

export const addProductToCartAndVerify = (text, url) => {
  cy.get(selector.productDetailsImg).should('be.visible');
  cy.getBySel(selector.addToCartBtnFromDetails).click();
  cy.getBySel(selector.removeBtnFromDetails).should('have.text', text);
  cy.getBySel(selector.goToCart).click();
  cy.url().should('include', url);
  verifyProductDetails();
};

export const selectSortOption = (select) => {
  cy.getBySel(selector.sortContainer).select(select);
};

export const verifySortingOrder = (select) => {
  selectSortOption(select);
   if(select === selector.selectAZ || select === selector.selectZA){
      const reverse = select === selector.selectZA;
      cy.get(selector.itemName).then(items => {
          const names = [...items].map(item => item.innerText);
          const sortedNames = [...names].sort();
          if (reverse) {sortedNames.reverse()} 
          expect(names).to.deep.equal(sortedNames);
        });
   } else if (select === selector.selectHiLo || select === selector.selectLoHi){
      const highToLow = select === selector.selectLoHi;
      cy.get(selector.itemPrice).then(items => {
        const prices = [...items].map(item => parseFloat(item.innerText.replace('$', '')));
        const sortedPrices = [...prices].sort((a, b) => highToLow ?  a - b : b - a);
        expect(prices).to.deep.equal(sortedPrices);
      });    
   }
  };

// Functions for Cart Page
export const addBackpackToCart = (txt) => {
  cy.getBySel(selector.addToCartBackpackProduct).click();
  cy.getBySel(selector.removeBackpackProduct).should('have.text', txt);
};

export const addBikeToCart = (txt) => {
  cy.getBySel(selector.addToCartBikeProduct).click();
  cy.getBySel(selector.removeBikeProduct).should('have.text', txt);
};

export const addBackpackAndBikeToCart = (txt) => {
  addBackpackToCart(txt);
  addBikeToCart(txt);
};

export const removeBackpackFromCart = () => {
  cy.getBySel(selector.removeBackpackProduct).click();
};

export const removeBikeFromCart = () => {
  cy.getBySel(selector.removeBikeProduct).click();
};

export const goToCart = () => {
  cy.getBySel(selector.goToCart).click();
    cy.url().should('include', data.cartPageUrl);
};

export const verifyProductQuantityInCart = (nr) => {
  cy.getBySel(selector.itemQuantity).each(($el) => {
      cy.wrap($el).should("have.text", nr);
  });
};

export const verifyEmptyCartList = () => {
  cy.getBySel(selector.listItem).should('not.exist');
};

export const verifyEmptyCartBadge = () => {
  cy.getBySel(selector.quantityCartBadge).should('not.exist');
};

export const verifyBadgeQuantity = (text) => {
  cy.getBySel(selector.quantityCartBadge).should('have.text', text);
};

export const goBackToContinueShopping = () => {
  cy.getBySel(selector.continueShopingBtn).click();
  cy.url().should('include', data.inventoryPageUrl);
};

// Functions for Checkout Page
export const goToFirstCheckoutPage = () => {
  cy.getBySel(selector.checkoutBtn).click();
  cy.url().should('include', data.checkoutStepOnePageUrl);
};

  export const clickAllItemsSidebar = () => {
    cy.getBySel(selector.allItemsSidebar).click();
};

export const verifyDetailInformationAboutAddProducts = (firstProductName, secondProductName, firstProductPrice, secondProductPrice) => {
  cy.contains(firstProductName).should('be.visible');
  cy.contains(secondProductName).should('be.visible');
  cy.getBySel(selector.productDetailsPrice).first().should('have.text' , `$${firstProductPrice}`);
  cy.getBySel(selector.productDetailsPrice).last().should('have.text' , `$${secondProductPrice}`);
};

export const checkErrorText = (text) => {
  cy.getBySel(selector.errorMsg).should('have.text', text);
};

export const fillYourInformation = (fn, ln, zc) => {
  if (fn !== undefined) cy.getBySel(selector.firstNameCheckoutPage).type(fn);
  if (ln !== undefined) cy.getBySel(selector.lastNameCheckoutPage).type(ln);
  if (zc!== undefined) cy.getBySel(selector.zipCodeCheckoutPage).type(zc);
};

export const fillYourInformationAndCheckError = (fn, ln, zc, err) => {
  fillYourInformation(fn, ln, zc);
  cy.getBySel(selector.continueBtnCheckoutPage).click();
  checkErrorText(err);
};

export const clickContinueBtnCheckoutPage = () => {
  cy.getBySel(selector.continueBtnCheckoutPage).click();
  cy.url().should('include', data.checkoutStepTwoPageUrl);
};


export const goToFinishCheckoutPage = () => {
  cy.getBySel(selector.finishBtnCkeckoutPage).click();
  cy.url().should('include', data.checkoutCompletePageUrl);
};

export const goBackToHomePage = () => {
  cy.getBySel(selector.goBackHomeBtn).click();
  cy.url().should('include', data.inventoryPageUrl);
  cy.contains('Products').should('be.visible');
};

export const clickCancelCheckoutBtn = () => {
  cy.getBySel(selector.cancelBtnCheckoutPage).click();
};
