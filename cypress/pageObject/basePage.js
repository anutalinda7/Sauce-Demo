export class BasePage {
    
    getElement (selector){
        return cy.get(selector)
    }

    verifyContainsVisibility(contains){
        cy.contains(contains).should('be.visible');
    }
   
}