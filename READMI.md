# Cypress Automation - OrangeHRM

## Website
https://opensource-demo.orangehrmlive.com/

## Scope
Automation testing untuk fitur Login.

## Test Cases
- TC-LOG-001 - Login menggunakan credential valid
- TC-LOG-002 - Login dengan username tidak valid
- TC-LOG-003 - Login dengan password tidak valid
- TC-LOG-004 - Login dengan username dan password tidak valid
- TC-LOG-005 - Validasi username kosong
- TC-LOG-006 - Validasi password kosong
- TC-LOG-007 - Validasi username dan password kosong
- TC-LOG-008 - Validasi tampilan password
- TC-LOG-009 - Login dengan username menggunakan huruf kapital berbeda
- TC-LOG-010 - Login menggunakan karakter khusus pada password
- TC-LOG-011 - Mengakses fitur Forgot Password
- TC-LOG-012 - Login menggunakan tombol Enter

## Test Result
11 Passed
1 Failed

## Failed Test
TC-LOG-009 - Login dengan username menggunakan huruf kapital berbeda.

Expected:
Username case-sensitive dan login harus ditolak.

Actual:
Username "ADMIN" berhasil login dan diarahkan ke Dashboard.