class HalamanDirectory {

    // LOCATOR
    employeeNameInput() {
        return cy.get('.oxd-autocomplete-text-input > input');
    }

    jobTitleDropdown() {
        return cy.contains('.oxd-label', 'Job Title')
            .parent()
            .next();
    }

    locationDropdown() {
        return cy.contains('.oxd-label', 'Location')
            .parent()
            .next();
    }

    searchButton() {
        return cy.contains('button', 'Search');
    }

    resetButton() {
        return cy.contains('button', 'Reset');
    }

    directoryResult() {
        return cy.get('.orangehrm-directory-card');
    }

    visibleDirectoryResult() {
        return cy.get('.orangehrm-directory-card:visible');
    }

    employeeResult(employeeName) {
        return cy.contains(
            '.orangehrm-directory-card-header',
            employeeName
        );
    }

    noRecordMessage() {
        return cy.contains('No Records Found');
    }

    employeeJobTitleResult() {
        return '.orangehrm-directory-card-subtitle';
    }

    jobTitleResult(jobTitle) {
        return cy.contains(
            '.orangehrm-directory-card-subtitle',
            jobTitle
        );
    }

    employeeLocationResult() {
        return '.orangehrm-directory-card';
    }

    locationResult(location) {
        return cy.contains(
            '.orangehrm-directory-card',
            location
        );
    }

    // ACTION
    visit() {
        cy.visit(
            'https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory'
        );
    }

    enterEmployeeName(employeeName) {
        this.employeeNameInput()
            .clear()
            .type(employeeName);
    }

    selectEmployeeSuggestion() {
        this.employeeNameInput()
            .type('{downarrow}')
            .type('{enter}');
    }

    selectJobTitle(jobTitle) {
        this.jobTitleDropdown()
            .click();

        cy.contains('.oxd-select-option', jobTitle)
            .click();
    }

    selectLocation(location) {
        this.locationDropdown()
            .click();

        cy.contains('.oxd-select-option', location)
            .click();
    }

    clickSearch() {
        this.searchButton()
            .click();
    }

    clickReset() {
        this.resetButton()
            .click();
    }

    // ASSERTION
    assertJobTitleResponse(interception, expectedJobTitle) {

        expect(interception.response.statusCode)
            .to.eq(200);

        expect(interception.response.body.meta.total)
            .to.be.greaterThan(0);

        interception.response.body.data.forEach((employee) => {

            expect(employee.jobTitle.title)
                .to.eq(expectedJobTitle);

        });
    }

    assertJobTitleResultVisible() {
        this.visibleDirectoryResult()
            .should('have.length.greaterThan', 0);
    }

    assertLocationResponse(interception, expectedLocation) {

        expect(interception.response.statusCode)
            .to.eq(200);

        expect(interception.response.body.meta.total)
            .to.be.greaterThan(0);

        interception.response.body.data.forEach((employee) => {
            expect(employee.location.name)
                .to.eq(expectedLocation);
        });
    }

    assertCombinationFilterResponse(
        interception,
        expectedEmployeeName,
        expectedJobTitle,
        expectedLocation
    ) {

        expect(interception.response.statusCode)
            .to.eq(200);

        expect(interception.response.body.meta.total)
            .to.be.greaterThan(0);

        interception.response.body.data.forEach((employee) => {

            const employeeName = [
                employee.firstName,
                employee.middleName,
                employee.lastName
            ]
                .filter(Boolean)
                .join(' ');

            expect(employeeName)
                .to.eq(expectedEmployeeName);

            expect(employee.jobTitle.title)
                .to.eq(expectedJobTitle);

            expect(employee.location.name)
                .to.eq(expectedLocation);

        });
    }

    // INTERCEPT
    interceptDirectory(aliasName = 'directoryRequest') {
        cy.intercept(
            'GET',
            '**/web/index.php/api/v2/directory/employees*'
        ).as(aliasName);
    }

    interceptEmployeeAutocomplete(aliasName = 'employeeAutocomplete') {
        cy.intercept(
            'GET',
            '**/web/index.php/api/v2/directory/employees*',
            (req) => {
                if (req.query.nameOrId) {
                    req.alias = aliasName;
                }
            }
        );
    }

    interceptJobTitleFilter(aliasName = 'filterJobTitle') {
        cy.intercept(
            'GET',
            '**/web/index.php/api/v2/directory/employees*',
            (req) => {
                if (req.query.jobTitleId) {
                    req.alias = aliasName;
                }
            }
        );
    }

    interceptLocationFilter(aliasName = 'filterLocation') {
        cy.intercept(
            'GET',
            '**/web/index.php/api/v2/directory/employees*',
            (req) => {
                if (req.query.locationId) {
                    req.alias = aliasName;
                }
            }
        );
    }

    interceptCombinationFilter(aliasName = 'combinationFilter') {
        cy.intercept(
            'GET',
            '**/web/index.php/api/v2/directory/employees*',
            (req) => {
                if (
                    req.query.nameOrId &&
                    req.query.jobTitleId &&
                    req.query.locationId
                ) {
                    req.alias = aliasName;
                }
            }
        );
    }

}

export default HalamanDirectory;