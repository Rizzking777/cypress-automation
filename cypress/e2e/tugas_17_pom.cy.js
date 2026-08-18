import HalamanLogin from '../obyekHalaman/halamanLogin';

describe('Login Feature - POM', () => {

    const halamanLogin = new HalamanLogin();
    let dataLogin;

    before(() => {
        cy.fixture('dataLogin').then((data) => {
            dataLogin = data;
        });
    });

    beforeEach(() => {
        halamanLogin.visit();
    });

    // TC-LOG-001
    it('TC-LOG-001 - Login menggunakan credential valid', () => {

        halamanLogin.login(
            dataLogin.validUser.username,
            dataLogin.validUser.password
        );

        cy.url().should('include', '/dashboard');
    });

    // TC-LOG-002
    it('TC-LOG-002 - Login dengan username tidak valid', () => {

        halamanLogin.login(
            dataLogin.invalidUsername.username,
            dataLogin.invalidUsername.password
        );

        cy.get('.oxd-alert-content-text')
            .should('contain', 'Invalid credentials');

        cy.url().should('include', '/auth/login');
    });

    // TC-LOG-003
    it('TC-LOG-003 - Login dengan password tidak valid', () => {

        halamanLogin.login(
            dataLogin.invalidPassword.username,
            dataLogin.invalidPassword.password
        );

        cy.get('.oxd-alert-content-text')
            .should('contain', 'Invalid credentials');

        cy.url().should('include', '/auth/login');
    });

    // TC-LOG-004
    it('TC-LOG-004 - Login dengan username dan password tidak valid', () => {

        halamanLogin.login(
            dataLogin.invalidCredentials.username,
            dataLogin.invalidCredentials.password
        );

        cy.get('.oxd-alert-content-text')
            .should('contain', 'Invalid credentials');

        cy.url().should('include', '/auth/login');
    });


    // TC-LOG-005
    it('TC-LOG-005 - Validasi username kosong', () => {

        halamanLogin.enterPassword(dataLogin.validUser.password);
        halamanLogin.clickLogin();

        halamanLogin.requiredMessage()
            .should('contain', 'Required');
    });

    // TC-LOG-006
    it('TC-LOG-006 - Validasi password kosong', () => {

        halamanLogin.enterUsername(dataLogin.validUser.username);
        halamanLogin.clickLogin();

        halamanLogin.requiredMessage()
            .should('contain', 'Required');
    });

    // TC-LOG-007
    it('TC-LOG-007 - Validasi username dan password kosong', () => {

        halamanLogin.clickLogin();

        halamanLogin.requiredMessage()
            .should('have.length', 2);

        halamanLogin.requiredMessage()
            .each(($el) => {
                cy.wrap($el).should('contain', 'Required');
            });
    });

    // TC-LOG-008
    it('TC-LOG-008 - Validasi tampilan password', () => {

        halamanLogin.enterPassword(dataLogin.validUser.password);

        halamanLogin.passwordInput()
            .should('have.attr', 'type', 'password');
    });

});