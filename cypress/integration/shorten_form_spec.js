describe('Unit test for Shorten Form', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  context('form', function() {
    it('Enters fields and submits form', function() {
      cy.get('#url')
        .type('www.google.com')
        .should('have.value', 'www.google.com')
  
      cy.get('#customUrl')
        .type('my_google_url')
        .should('have.value', 'my_google_url')
  
      cy.contains('Submit').click()
  
      cy.url().should('include', '/?url=www.google.com&customUrl=my_google_url')
    })

    it('Notifies that url does not exists', function() {
      cy.get('#url')
        .type('www.googl.io')
        .should('have.value', 'www.googl.io')

      cy.contains('Submit').click()
      
    })
  })
})