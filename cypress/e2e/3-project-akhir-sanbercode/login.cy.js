import HalamanLogin from '../../obyekHalaman/halamanLoginTa';

describe('Project Akhir - Login Feature', () => {

    const halamanLoginTa = new HalamanLogin();
    let dataLoginTa;

    // LOAD TEST DATA
    before(() => {
        cy.fixture('dataLoginTa').then((data) => {
            dataLoginTa = data;
        });
    });

    // OPEN LOGIN PAGE
    beforeEach(() => {
        halamanLoginTa.visit();
    });

    // TC-001
    it('TC-001 - Login menggunakan credential valid', () => {

        halamanLoginTa.interceptLogin('loginValid');

        halamanLoginTa.login(
            dataLoginTa.loginValid.username,
            dataLoginTa.loginValid.password
        );

        cy.wait('@loginValid');

        cy.url()
            .should('include', '/dashboard');
    });

    // TC-002
    it('TC-002 - Login dengan username tidak valid', () => {

        halamanLoginTa.interceptLogin('usernameInvalid');

        halamanLoginTa.login(
            dataLoginTa.usernameInvalid.username,
            dataLoginTa.usernameInvalid.password
        );

        cy.wait('@usernameInvalid');

        cy.get('.oxd-alert-content-text')
            .should('contain', 'Invalid credentials');

        cy.url()
            .should('include', '/auth/login');
    });

    // TC-003
    it('TC-003 - Login dengan password tidak valid', () => {

        halamanLoginTa.interceptLogin('passwordInvalid');

        halamanLoginTa.login(
            dataLoginTa.passwordInvalid.username,
            dataLoginTa.passwordInvalid.password
        );

        cy.wait('@passwordInvalid');

        cy.get('.oxd-alert-content-text')
            .should('contain', 'Invalid credentials');

        cy.url()
            .should('include', '/auth/login');
    });

    // TC-004
    it('TC-004 - Login dengan username dan password tidak valid', () => {

        halamanLoginTa.interceptLogin('credentialsInvalid');

        halamanLoginTa.login(
            dataLoginTa.credentialsInvalid.username,
            dataLoginTa.credentialsInvalid.password
        );

        cy.wait('@credentialsInvalid');

        cy.get('.oxd-alert-content-text')
            .should('contain', 'Invalid credentials');

        cy.url()
            .should('include', '/auth/login');
    });

    // TC-005
    it('TC-005 - Validasi username kosong', () => {

        halamanLoginTa.interceptLogin('usernameKosong');

        halamanLoginTa.enterPassword(
            dataLoginTa.usernameKosong.password
        );

        halamanLoginTa.clickLogin();

        halamanLoginTa.requiredMessage()
            .should('be.visible')
            .and('contain', 'Required');

        cy.get('@usernameKosong.all')
            .should('have.length', 0);
    });

    // TC-006
    it('TC-006 - Validasi password kosong', () => {

        halamanLoginTa.interceptLogin('passwordKosong');

        halamanLoginTa.enterUsername(
            dataLoginTa.passwordKosong.username
        );

        halamanLoginTa.clickLogin();

        halamanLoginTa.requiredMessage()
            .should('be.visible')
            .and('contain', 'Required');

        cy.get('@passwordKosong.all')
            .should('have.length', 0);
    });

    // TC-007
    it('TC-007 - Validasi username dan password kosong', () => {

        halamanLoginTa.interceptLogin('credentialsKosong');

        halamanLoginTa.clickLogin();

        halamanLoginTa.requiredMessage()
            .should('have.length', 2);

        halamanLoginTa.requiredMessage()
            .each(($el) => {
                cy.wrap($el)
                    .should('contain', 'Required');
            });

        cy.get('@credentialsKosong.all')
            .should('have.length', 0);
    });

    // TC-008
    it('TC-008 - Validasi tampilan password', () => {

        halamanLoginTa.enterPassword(
            dataLoginTa.passwordMasked.password
        );

        halamanLoginTa.passwordInput()
            .should('have.attr', 'type', 'password');
    });

});