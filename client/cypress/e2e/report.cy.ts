describe("독후감 CRUD 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(
      ":nth-child(1) > .sc-fsQiph > .main > .contents-box > .sc-beqWaB > a"
    ).click();
  });

  it("독후감 등록 테스트", function () {
    // cy.get("ul > li:first-child").click();
    // cy.get(".sc-ktEKTO").click();
    // cy.get(".sc-jsMahE").clear();
    // cy.get(".sc-jsMahE").type("05");
    // cy.get("textarea").click();
    // cy.get("textarea").type(
    //   "오만과 편견에 대해서 5p까지 읽었다..."
    // );
    // cy.get(".page > :nth-child(1)").click();
    // cy.get(".page > :nth-child(1)").should("have.text", "5");
    // cy.get(".text > p").should("have.text", "오만과 편견에 대해서 5p까지 읽었다...");
  });

  it('독후감 수정 테스트', function() {
    // cy.get("ul > li:first-child").click();
    // cy.get('.sc-jsMahE').clear();
    // cy.get('.sc-jsMahE').type('024');
    // cy.get('textarea').click();
    // cy.get('textarea').click();
    // cy.get('[type="submit"]').click();
    // cy.get('.page > :nth-child(1)').should('have.text', '34');
    // cy.get('.text > p').should('have.text', '오만과 편견에 대해서 24p까지 읽었다...');
  });

  it('독후감 삭제 테스트', function() {
    // cy.get('.sc-ktEKTO > .box-top > .sc-gLDzan').click();
    // cy.get('textarea').should('be.visible');
  });
});
