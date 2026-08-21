describe('Categories API Automation', () => {

    const baseUrl = 'https://api.escuelajs.co/api/v1';

    // TC-API-001
    it('TC-API-001 - Get all categories', () => {

        cy.request('GET', `${baseUrl}/categories`)
            .then((response) => {

                // Assertion status code
                expect(response.status).to.eq(200);

                // Assertion response body value
                expect(response.body).to.be.an('array');
                expect(response.body.some(category => category.id === 2)).to.eq(true);
            });
    });


    // TC-API-002
    it('TC-API-002 - Get category by ID 2', () => {

        cy.request('GET', `${baseUrl}/categories/2`)
            .then((response) => {

                expect(response.status).to.eq(200);

                expect(response.body.id).to.eq(2);
                expect(response.body.name).to.eq('Electronics');
            });
    });


    // TC-API-003
    it('TC-API-003 - Get category by ID 3', () => {

        cy.request('GET', `${baseUrl}/categories/3`)
            .then((response) => {

                expect(response.status).to.eq(200);

                expect(response.body.id).to.eq(3);
                expect(response.body.name).to.eq('Furniture');
            });
    });


    // TC-API-004
    it('TC-API-004 - Get category by ID 4', () => {

        cy.request('GET', `${baseUrl}/categories/4`)
            .then((response) => {

                expect(response.status).to.eq(200);

                expect(response.body.id).to.eq(4);
                expect(response.body.name).to.eq('Shoes');
            });
    });


    // TC-API-005
    it('TC-API-005 - Get category by ID 5', () => {

        cy.request('GET', `${baseUrl}/categories/5`)
            .then((response) => {

                expect(response.status).to.eq(200);

                expect(response.body.id).to.eq(5);
                expect(response.body.name).to.eq('Miscellaneous');
            });
    });


    // TC-API-006
    it('TC-API-006 - Get category by slug electronics', () => {

        cy.request('GET', `${baseUrl}/categories/slug/electronics`)
            .then((response) => {

                expect(response.status).to.eq(200);

                expect(response.body.id).to.eq(2);
                expect(response.body.slug).to.eq('electronics');
            });
    });


    // TC-API-007
    it('TC-API-007 - Get category by slug furniture', () => {

        cy.request('GET', `${baseUrl}/categories/slug/furniture`)
            .then((response) => {

                expect(response.status).to.eq(200);

                expect(response.body.id).to.eq(3);
                expect(response.body.slug).to.eq('furniture');
            });
    });


    // TC-API-008
    it('TC-API-008 - Get category by slug shoes', () => {

        cy.request('GET', `${baseUrl}/categories/slug/shoes`)
            .then((response) => {

                expect(response.status).to.eq(200);

                expect(response.body.id).to.eq(4);
                expect(response.body.slug).to.eq('shoes');
            });
    });


    // TC-API-009
    it('TC-API-009 - Get category by slug miscellaneous', () => {

        cy.request('GET', `${baseUrl}/categories/slug/miscellaneous`)
            .then((response) => {

                expect(response.status).to.eq(200);

                expect(response.body.id).to.eq(5);
                expect(response.body.slug).to.eq('miscellaneous');
            });
    });


    // TC-API-010
    it('TC-API-010 - Get products by category ID 2', () => {

        cy.request('GET', `${baseUrl}/categories/2/products`)
            .then((response) => {

                expect(response.status).to.eq(200);

                expect(response.body).to.be.an('array');
                expect(response.body.length).to.be.greaterThan(0);
                expect(response.body[0].category.id).to.eq(2);
            });
    });


    // TC-API-011
    it('TC-API-011 - Get products by category ID 3', () => {

        cy.request('GET', `${baseUrl}/categories/3/products`)
            .then((response) => {

                expect(response.status).to.eq(200);

                expect(response.body).to.be.an('array');
                expect(response.body.length).to.be.greaterThan(0);
                expect(response.body[0].category.id).to.eq(3);
            });
    });


    // TC-API-012
    it('TC-API-012 - Get products by category ID 4', () => {

        cy.request('GET', `${baseUrl}/categories/4/products`)
            .then((response) => {

                expect(response.status).to.eq(200);

                expect(response.body).to.be.an('array');

                expect(response.body).to.have.lengthOf(0);
            });
    });

});