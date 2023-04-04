describe('기본 화면 테스트', () => {
  context('도서 리스트가 있는 경우', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('도서 리스트를 보여준다.', () => {
      cy.get('ul > li').should('have.length.at.least', 3);
    });

    it('요청 에러가 발생한다면, 에러 메세지를 보여준다.', () => {
      cy.intercept({
        url: 'http://localhost:4000/board',
        method: 'GET',
        status: 500,
        response: {},
      });
      cy.get('ul > li').should('not.exist');
      cy.get('.error-box').should('be.visible').and('contain', '잘못된 요청입니다.');
    });

    it('서버 에러가 발생한다면, 에러 메세지를 보여준다.', () => {
      cy.intercept('GET', '/book/', {
        statusCode: 404
      })
      cy.get('ul > li').should('not.exist');
      cy.get('.error-box').should('be.visible').and('contain', '서버 에러가 발생했습니다. 관리자에게 문의해 주세요.');
    });
  })

  context('도서 리스트가 없는 경우', () => {

    // it('도서 리스트를 안 보여준다.', () => {
    //   cy.get('ul').should('not.exist');
    // });

  })
})