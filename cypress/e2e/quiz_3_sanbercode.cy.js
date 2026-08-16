describe('Login Feature', () => {

    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    // TC-LOG-001
    it('TC-LOG-001 - Login menggunakan credential valid', () => {

        // Test Steps
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('.orangehrm-login-button').click();

        // Assertion / Expected Result
        cy.url().should('include', '/dashboard');
    });

    // TC-LOG-002
    it('TC-LOG-002 - Login dengan username tidak valid', () => {

        // Test Steps
        cy.get('[name="username"]').type('Testtest');
        cy.get('[name="password"]').type('admin123');
        cy.get('.orangehrm-login-button').click();

        // Assertion / Expected Result
        cy.get('.oxd-alert-content-text')
            .should('contain', 'Invalid credentials');

        cy.url().should('include', '/auth/login');
    });

    // TC-LOG-003
    it('TC-LOG-003 - Login dengan password tidak valid', () => {

        // Test Steps
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123456');
        cy.get('.orangehrm-login-button').click();

        // Assertion / Expected Result
        cy.get('.oxd-alert-content-text')
            .should('contain', 'Invalid credentials');

        cy.url().should('include', '/auth/login');
    });

    // TC-LOG-004
    it('TC-LOG-004 - Login dengan username dan password tidak valid', () => {

        // Test Steps
        cy.get('[name="username"]').type('Admin123');
        cy.get('[name="password"]').type('Admin123456');
        cy.get('.orangehrm-login-button').click();

        // Assertion / Expected Result
        cy.get('.oxd-alert-content-text')
            .should('contain', 'Invalid credentials');

        cy.url().should('include', '/auth/login');
    });

    // TC-LOG-005
    it('TC-LOG-005 - Validasi username kosong', () => {
        cy.get('[name="password"]').type('admin123');
        cy.get('.orangehrm-login-button').click();

        cy.get('.oxd-input-field-error-message')
            .should('contain', 'Required');
    });

    // TC-LOG-006
    it('TC-LOG-006 - Validasi password kosong', () => {
        cy.get('[name="username"]').type('Admin');
        cy.get('.orangehrm-login-button').click();

        cy.get('.oxd-input-field-error-message')
            .should('contain', 'Required');
    });

    // TC-LOG-007
    it('TC-LOG-007 - Validasi username dan password kosong', () => {
        cy.get('.orangehrm-login-button').click();

        cy.get('.oxd-input-field-error-message')
            .should('have.length', 2)
            .each(($el) => {
                cy.wrap($el).should('contain', 'Required');
            });
    });

    // TC-LOG-008
    it('TC-LOG-008 - Validasi tampilan password', () => {
        cy.get('[name="password"]')
            .type('admin123')
            .should('have.attr', 'type', 'password');
    });

    // TC-LOG-009
    it('TC-LOG-009 - Login dengan username menggunakan huruf kapital berbeda', () => {
        cy.get('[name="username"]').type('ADMIN');
        cy.get('[name="password"]').type('admin123');
        cy.get('.orangehrm-login-button').click();

        // Expected: username case-sensitive, login harus ditolak
        cy.url().should('include', '/auth/login');
    });

    // TC-LOG-010
    it('TC-LOG-010 - Login menggunakan karakter khusus pada password', () => {
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('Password@123!');
        cy.get('.orangehrm-login-button').click();

        // Password dengan karakter khusus berhasil diproses, tetapi credential tidak valid sehingga login ditolak
        cy.get('.oxd-alert-content-text')
            .should('contain', 'Invalid credentials');

        cy.url().should('include', '/auth/login');
    });

    // TC-LOG-011
    it('TC-LOG-011 - Mengakses fitur Forgot Password', () => {
        cy.contains('Forgot your password?').click();

        cy.url().should('include', '/auth/requestPasswordResetCode');
    });

    // TC-LOG-012
    it('TC-LOG-012 - Login menggunakan tombol Enter', () => {
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123{enter}');

        cy.url().should('include', '/dashboard');
    });

});