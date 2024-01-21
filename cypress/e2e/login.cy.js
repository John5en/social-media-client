describe("Login and logout test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(500);
    cy.get("#registerModal button[data-auth='login']").click();
    cy.get("#loginModal", { timeout: 10000 }).should("be.visible");
  });

  it("tries to log in with wrong credentials", () => {
    cy.get("#loginEmail").invoke("val", "dud@dud.noroff.no");
    cy.get("#loginPassword").invoke("val", "dud");

    cy.get("#loginModal button.btn-success").click();
  });

  it("logs in with valid credentials", () => {
    cy.get("#loginEmail").invoke("val", "testuser1000@stud.noroff.no");
    cy.get("#loginPassword").invoke("val", "testuser1000");

    cy.get("#loginModal button.btn-success").click();
  });

  it("logs out using the logout button", () => {
    cy.get('button[data-auth="logout"]').click({ force: true });
  });
});
