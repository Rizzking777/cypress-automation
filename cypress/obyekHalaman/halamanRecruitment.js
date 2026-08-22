class HalamanRecruitment {

    // LOCATOR
    candidateNameInput() {
        return cy.get('input[placeholder="Type for hints..."]');
    }

    vacancyDropdown() {
        return cy.contains('.oxd-label', 'Vacancy')
            .parent()
            .next();
    }

    statusDropdown() {
        return cy.contains('.oxd-label', 'Status')
            .parent()
            .next();
    }

    fromDateInput() {
        return cy.get('input[placeholder="From"]');
    }

    toDateInput() {
        return cy.get('input[placeholder="To"]');
    }

    searchButton() {
        return cy.contains('button', 'Search');
    }

    resetButton() {
        return cy.contains('button', 'Reset');
    }

    recruitmentTable() {
        return cy.get('.oxd-table');
    }

    noRecordMessage() {
        return cy.contains('No Records Found');
    }

    // ACTION
    visit() {
        cy.visit(
            'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates'
        );
    }

    selectCandidateSuggestion(candidateName) {
        cy.contains(
            '.oxd-autocomplete-option',
            candidateName
        )
            .click();
    }

    enterCandidateName(candidateName) {
        this.candidateNameInput()
            .clear()
            .type(candidateName);
    }

    selectVacancy(vacancy) {
        this.vacancyDropdown()
            .click();

        cy.contains('.oxd-select-option', vacancy)
            .click();
    }

    selectStatus(status) {
        this.statusDropdown()
            .click();

        cy.contains('.oxd-select-option', status)
            .click();
    }

    enterFromDate(date) {
        this.fromDateInput()
            .clear()
            .type(date);
    }

    enterToDate(date) {
        this.toDateInput()
            .clear()
            .type(date);
    }

    clickSearch() {
        this.searchButton()
            .click();
    }

    clickReset() {
        this.resetButton()
            .click();
    }

    // INTERCEPT
    interceptCandidates(aliasName = 'candidateRequest') {
        cy.intercept(
            'GET',
            '**/api/**'
        ).as(aliasName);
    }

    interceptCandidateAutocomplete(aliasName = 'candidateAutocomplete') {
        cy.intercept(
            'GET',
            '**/api/v2/recruitment/candidates*',
            (req) => {
                if (req.query.candidateName) {
                    req.alias = aliasName;
                }
            }
        );
    }

}

export default HalamanRecruitment;