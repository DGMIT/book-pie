describe('책 CRUD 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('책 등록 테스트', function() {
    cy.get('.sc-irTswW').click();
    cy.get('#book-title').clear();
    cy.get('#book-title').type('책 등록 테스트');
    cy.get('#book-author').clear();
    cy.get('#book-author').type('저자명');
    cy.get('#book-publisher').clear();
    cy.get('#book-publisher').type('출판사명');
    cy.get('[type="submit"]').click();
    cy.get('ul > :nth-child(1) > div').should('contain', '책 등록 테스트');
    cy.get('ul > :nth-child(1) > div').should('contain', '저자명');
    cy.get('ul > :nth-child(1) > div').should('contain', '출판사명');
  });

  it('책 수정 테스트', function() {
    cy.get(':nth-child(1) > .sc-jTrPJq > .box-top > :nth-child(2)').click();
    cy.get('#book-title').clear('책 등록 테스트');
    cy.get('#book-title').type('수정된 책 등록 테스트');
    cy.get('#book-author').clear('저자명2');
    cy.get('#book-author').type('저자명2');
    cy.get('#book-publisher').clear('출판사명2');
    cy.get('#book-publisher').type('출판사명2');
    cy.get('[type="submit"]').click();
    cy.get('ul > :nth-child(1) > div').should('contain', '수정된 책 등록 테스트');
    cy.get('ul > :nth-child(1) > div').should('contain', '저자명2');
    cy.get('ul > :nth-child(1) > div').should('contain', '출판사명2');
  });

  it('책 삭제 테스트', function() {
    cy.get(':nth-child(1) > .sc-jTrPJq > .box-top > :nth-child(3)').click();
  });
});

