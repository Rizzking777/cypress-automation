import HalamanLogin from '../../obyekHalaman/halamanLoginTa';
import HalamanDirectory from '../../obyekHalaman/halamanDirectory';

describe('Project Akhir - Directory Feature', () => {

    const halamanLoginTa = new HalamanLogin();
    const halamanDirectory = new HalamanDirectory();

    let dataLoginTa;
    let dataDirectory;

    before(() => {
        cy.fixture('dataLoginTa').then((data) => {
            dataLoginTa = data;
        });

        cy.fixture('dataDirectory').then((data) => {
            dataDirectory = data;
        });
    });

    beforeEach(() => {
        halamanLoginTa.visit();

        halamanLoginTa.login(
            dataLoginTa.loginValid.username,
            dataLoginTa.loginValid.password
        );

        cy.url()
            .should('include', '/dashboard');

        halamanDirectory.visit();
    });

    // TC-001
    it('TC-001 - Akses menu Directory', () => {

        halamanDirectory.interceptDirectory('directoryPage');

        cy.wait('@directoryPage');

        cy.url()
            .should('include', '/directory/viewDirectory');

        halamanDirectory.employeeNameInput()
            .should('be.visible');

        halamanDirectory.searchButton()
            .should('be.visible');

        halamanDirectory.resetButton()
            .should('be.visible');

        halamanDirectory.jobTitleDropdown()
            .should('be.visible');

        halamanDirectory.locationDropdown()
            .should('be.visible');
    });

    // TC-002
    it('TC-002 - Pencarian employee berdasarkan nama', () => {

        halamanDirectory.interceptEmployeeAutocomplete();

        halamanDirectory.enterEmployeeName(
            dataDirectory.searchEmployee.input
        );

        cy.wait('@employeeAutocomplete');

        halamanDirectory.selectEmployeeSuggestion();

        cy.contains('Invalid')
            .should('not.exist');

        halamanDirectory.interceptDirectory('searchEmployee');

        halamanDirectory.clickSearch();

        cy.wait('@searchEmployee');

        halamanDirectory.employeeResult(
            dataDirectory.searchEmployee.expected
        ).should('be.visible');
    });

    // TC-003
    it('TC-003 - Filter berdasarkan Job Title', () => {

        halamanDirectory.interceptJobTitleFilter('filterJobTitle');

        halamanDirectory.selectJobTitle(
            dataDirectory.jobTitle
        );

        halamanDirectory.clickSearch();

        cy.wait('@filterJobTitle').then((interception) => {

            halamanDirectory.assertJobTitleResponse(
                interception,
                dataDirectory.jobTitle
            );

        });

        halamanDirectory.assertJobTitleResultVisible();

    });

    // TC-004
    it('TC-004 - Filter berdasarkan Location', () => {

        halamanDirectory.interceptLocationFilter('filterLocation');

        halamanDirectory.selectLocation(
            dataDirectory.location
        );

        halamanDirectory.clickSearch();

        cy.wait('@filterLocation').then((interception) => {

            halamanDirectory.assertLocationResponse(
                interception,
                dataDirectory.location
            );

        });

        halamanDirectory.visibleDirectoryResult()
            .should('have.length.greaterThan', 0);

    });

    // TC-005
    it('TC-005 - Pencarian menggunakan kombinasi filter', () => {

        halamanDirectory.interceptEmployeeAutocomplete();

        halamanDirectory.enterEmployeeName(
            dataDirectory.combination.employeeNameInput
        );

        cy.wait('@employeeAutocomplete');

        halamanDirectory.selectEmployeeSuggestion();

        cy.contains('Invalid')
            .should('not.exist');

        halamanDirectory.selectJobTitle(
            dataDirectory.combination.jobTitle
        );

        halamanDirectory.selectLocation(
            dataDirectory.combination.location
        );

        halamanDirectory.interceptCombinationFilter('combinationFilter');

        halamanDirectory.clickSearch();

        halamanDirectory.visibleDirectoryResult()
            .should('have.length.greaterThan', 0);

    });

    // TC-006
    it('TC-006 - Pencarian menggunakan karakter khusus', () => {

        halamanDirectory.interceptDirectory('specialCharacter');

        halamanDirectory.enterEmployeeName(
            dataDirectory.specialCharacter
        );

        halamanDirectory.clickSearch();

        cy.wait('@specialCharacter');

        halamanDirectory.directoryResult()
            .should('be.visible');

        cy.get('body')
            .should('not.contain', 'Application Error');
    });

    // TC-007
    it('TC-007 - Kombinasi filter yang tidak menghasilkan data', () => {

        halamanDirectory.interceptDirectory('noResult');

        halamanDirectory.selectJobTitle(
            dataDirectory.noResultCombination.jobTitle
        );

        halamanDirectory.selectLocation(
            dataDirectory.noResultCombination.location
        );

        halamanDirectory.clickSearch();

        cy.wait('@noResult');

        halamanDirectory.noRecordMessage()
            .should('be.visible');
    });

    // TC-008
    it('TC-008 - Reset setelah pencarian tanpa hasil', () => {

        halamanDirectory.interceptDirectory('resetNoResult');

        halamanDirectory.enterEmployeeName(
            dataDirectory.resetAfterNoResult
        );

        halamanDirectory.clickSearch();

        cy.wait('@resetNoResult');

        halamanDirectory.clickReset();

        halamanDirectory.employeeNameInput()
            .should('have.value', '');

        halamanDirectory.directoryResult()
            .should('be.visible');
    });

});