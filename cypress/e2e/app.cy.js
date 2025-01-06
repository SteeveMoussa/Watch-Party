describe('React App', () => {
    it('Should load the login page', () => {
        cy.visit('/');
        cy.contains('Login');
    });
});