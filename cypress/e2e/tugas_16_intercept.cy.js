describe('Login Intercept', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  // TC-LOG-001
  it('TC-LOG-001 - Login valid dengan intercept', () => {

    cy.intercept('POST', '**/auth/validate', (req) => {
      expect(req.body).to.include('username=Admin');
      expect(req.body).to.include('password=admin123');
    }).as('validLogin');

    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('admin123');
    cy.get('.orangehrm-login-button').click();

    cy.wait('@validLogin');

    cy.url().should('include', '/dashboard');
  });

  // TC-LOG-002
  it('TC-LOG-002 - Username tidak valid dengan intercept', () => {

    cy.intercept('POST', '**/auth/validate', (req) => {
      expect(req.body).to.include('username=Testtest');
    }).as('invalidUsername');

    cy.get('[name="username"]').type('Testtest');
    cy.get('[name="password"]').type('admin123');
    cy.get('.orangehrm-login-button').click();

    cy.wait('@invalidUsername');

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials');
  });

  // TC-LOG-003
  it('TC-LOG-003 - Password tidak valid dengan intercept', () => {

    cy.intercept('POST', '**/auth/validate', (req) => {
      expect(req.body).to.include('username=Admin');
      expect(req.body).to.include('password=admin123456');
    }).as('invalidPassword');

    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('admin123456');
    cy.get('.orangehrm-login-button').click();

    cy.wait('@invalidPassword');

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials');
  });

  // TC-LOG-004
  it('TC-LOG-004 - Username dan password tidak valid dengan intercept', () => {

    cy.intercept('POST', '**/auth/validate', (req) => {
      expect(req.body).to.include('username=Admin123');
      expect(req.body).to.include('password=Admin123456');
    }).as('invalidCredentials');

    cy.get('[name="username"]').type('Admin123');
    cy.get('[name="password"]').type('Admin123456');
    cy.get('.orangehrm-login-button').click();

    cy.wait('@invalidCredentials');

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials');
  });

  // TC-LOG-005
  it('TC-LOG-005 - Username kosong dengan intercept', () => {

    cy.intercept('POST', '**/auth/validate').as('emptyUsername');

    cy.get('[name="password"]').type('admin123');
    cy.get('.orangehrm-login-button').click();

    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required');

    cy.get('@emptyUsername.all')
      .should('have.length', 0);
  });

  // TC-LOG-006
  it('TC-LOG-006 - Password kosong dengan intercept', () => {

    cy.intercept('POST', '**/auth/validate').as('emptyPassword');

    cy.get('[name="username"]').type('Admin');
    cy.get('.orangehrm-login-button').click();

    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required');

    cy.get('@emptyPassword.all')
      .should('have.length', 0);
  });

  // TC-LOG-007
  it('TC-LOG-007 - Username dan password kosong dengan intercept', () => {

    cy.intercept('POST', '**/auth/validate').as('emptyCredentials');

    cy.get('.orangehrm-login-button').click();

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 2);

    cy.get('@emptyCredentials.all')
      .should('have.length', 0);
  });

  // TC-LOG-009
  it('TC-LOG-009 - Username case sensitivity dengan intercept', () => {

    cy.intercept('POST', '**/auth/validate', (req) => {
      expect(req.body).to.include('username=ADMIN');
      expect(req.body).to.include('password=admin123');
    }).as('caseSensitiveLogin');

    cy.get('[name="username"]').type('ADMIN');
    cy.get('[name="password"]').type('admin123');
    cy.get('.orangehrm-login-button').click();

    cy.wait('@caseSensitiveLogin');

    // Expected user tetap di halaman login
    cy.url().should('include', '/auth/login');
  });

});