import HalamanLogin from '../../obyekHalaman/halamanLoginTa';
import HalamanRecruitment from '../../obyekHalaman/halamanRecruitment';

describe('Project Akhir - Recruitment Feature', () => {

    const halamanLoginTa = new HalamanLogin();
    const halamanRecruitment = new HalamanRecruitment();

    let dataLoginTa;
    let dataRecruitment;

    before(() => {
        cy.fixture('dataLoginTa').then((data) => {
            dataLoginTa = data;
        });

        cy.fixture('dataRecruitment').then((data) => {
            dataRecruitment = data;
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

        halamanRecruitment.visit();
    });

    // TC-001
    it('TC-001 - Akses menu Recruitment', () => {

        halamanRecruitment.interceptCandidates('recruitmentPage');

        cy.wait('@recruitmentPage');

        cy.url()
            .should('include', '/recruitment/viewCandidates');

        halamanRecruitment.candidateNameInput()
            .should('be.visible');

        halamanRecruitment.searchButton()
            .should('be.visible');

        halamanRecruitment.resetButton()
            .should('be.visible');

        halamanRecruitment.vacancyDropdown()
            .should('be.visible');

        halamanRecruitment.statusDropdown()
            .should('be.visible');
    });

    // TC-002
    it('TC-002 - Pencarian candidate berdasarkan nama', () => {

        halamanRecruitment.enterCandidateName(
            dataRecruitment.candidateName.input
        );

        halamanRecruitment.selectCandidateSuggestion(
            dataRecruitment.candidateName.expected
        );

        cy.contains('Invalid')
            .should('not.exist');

        halamanRecruitment.clickSearch();

    });

    // TC-003
    it('TC-003 - Filter berdasarkan Vacancy', () => {

        halamanRecruitment.interceptCandidates('filterVacancy');

        halamanRecruitment.selectVacancy(
            dataRecruitment.vacancy
        );

        halamanRecruitment.clickSearch();

        cy.wait('@filterVacancy');

        halamanRecruitment.recruitmentTable()
            .should('be.visible');
    });

    // TC-004
    it('TC-004 - Filter berdasarkan Status', () => {

        halamanRecruitment.interceptCandidates('filterStatus');

        halamanRecruitment.selectStatus(
            dataRecruitment.status
        );

        halamanRecruitment.clickSearch();

        cy.wait('@filterStatus');

        halamanRecruitment.recruitmentTable()
            .should('be.visible');
    });

    // TC-005
    it('TC-005 - Reset filter Recruitment', () => {

        halamanRecruitment.interceptCandidates('resetFilter');

        halamanRecruitment.selectVacancy(
            dataRecruitment.vacancy
        );

        halamanRecruitment.clickSearch();

        cy.wait('@resetFilter');

        halamanRecruitment.clickReset();

        halamanRecruitment.recruitmentTable()
            .should('be.visible');
    });

    // TC-006
    it('TC-006 - Input karakter khusus pada Candidate Name', () => {

        halamanRecruitment.interceptCandidates(
            'specialCharacter'
        );

        halamanRecruitment.enterCandidateName(
            dataRecruitment.specialCharacter
        );

        halamanRecruitment.clickSearch();

        cy.wait('@specialCharacter');

        halamanRecruitment.recruitmentTable()
            .should('be.visible');

        cy.get('body')
            .should('not.contain', 'Application Error');
    });

    // TC-007
    it('TC-007 - Date of Application dengan rentang tanggal tidak valid', () => {

        halamanRecruitment.enterFromDate(
            dataRecruitment.invalidDateRange.from
        );

        halamanRecruitment.enterToDate(
            dataRecruitment.invalidDateRange.to
        );

        halamanRecruitment.toDateInput()
            .blur();

        cy.get('.oxd-input-field-error-message')
            .should('exist')
            .and('contain.text', 'To date should be after From date');
    });

    // TC-008
    it('TC-008 - Kombinasi filter yang tidak menghasilkan data', () => {

        halamanRecruitment.interceptCandidates(
            'noResultCombination'
        );

        halamanRecruitment.selectVacancy(
            dataRecruitment.noResultCombination.vacancy
        );

        halamanRecruitment.selectStatus(
            dataRecruitment.noResultCombination.status
        );

        halamanRecruitment.clickSearch();

        cy.wait('@noResultCombination');

        halamanRecruitment.noRecordMessage()
            .should('be.visible');
    });

});