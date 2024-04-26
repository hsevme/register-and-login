import { User } from "@typings/user";
declare global {
  namespace Cypress {
    interface Chainable {
      registerNewUser;
    }
  }
}

/**
 * Sign up the given test user.
 * @param user The data of the test user as defined in <p>@typings/user</p>.
 *             This command uses first name, last name, e-mail address and password.
 */
const registerNewUser = (user: User) => {
  cy.get("a[href='/kundenkonto/bestellungen']")
    .should("contain.text", "Mein Konto")
    // TODO: find better solution to this
    .eq(0) // hsev: a[href='/kundenkonto/bestellungen'] is ambigious because there is an identical button in the burger menu
    .click({ force: true });

  cy.get(".sign-up-hint__link").should("be.visible").click();
  cy.get(".sign-up-dialog")
    .should("be.visible")
    .within(() => {
      cy.get("#sign-up-firstname").type(user.firstname);
      cy.get("#sign-up-lastname").type(user.lastname);
      cy.get("#sign-up-email").type(user.mail);
      cy.get("#sign-up-password").type(user.password);
      cy.get("button[type=submit]")
        .should("contain.text", "Neu Anmelden")
        .click({ force: true });
    });

  cy.get(".message-dialog__button")
    .should("have.text", "Zum Kundenkonto")
    .click({ force: true });
};

Cypress.Commands.add("registerNewUser", registerNewUser);
