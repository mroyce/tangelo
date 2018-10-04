describe('My Firt Test', () => {
  it('Does not do much!', () => {
    cy.visit('http://localhost:3001');
    cy.contains('Num Rows');
  });
});
