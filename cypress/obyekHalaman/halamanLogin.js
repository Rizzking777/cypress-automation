class HalamanLogin {

  // ELEMENT / LOCATOR
  usernameInput() {
    return cy.get('[name="username"]');
  }

  passwordInput() {
    return cy.get('[name="password"]');
  }

  loginButton() {
    return cy.get('.orangehrm-login-button');
  }

  requiredMessage() {
    return cy.get('.oxd-input-field-error-message');
  }

  forgotPasswordLink() {
    return cy.contains('Forgot your password?');
  }

  // ACTION
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  enterUsername(username) {
    this.usernameInput().type(username);
  }

  enterPassword(password) {
    this.passwordInput().type(password);
  }

  clickLogin() {
    this.loginButton().click();
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
  }
}

export default HalamanLogin;