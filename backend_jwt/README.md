# buildling a site with login functionality using npm package 'cookie-session'

## Sources
https://www.bezkoder.com/node-js-express-login-mongodb/ 
  (with conversion to esm and some editing for my preferences)

https://www.bezkoder.com/jwt-refresh-token-node-js-mongodb/ 

## Authentication
- [x] sign up
  - [x] tested?
- [x] sign in
  - [x] tested?
- [x] sign out
  - [x] tested?
- [x] add headers middleware and test

## Authorization
- [x] separate access to content by user role
  - [x] allAccess tested
  - [x] userBoard tested
  - [x] adminBoard tested
  - [x] moderatorBoard tested

## Refresh token

## Password Reset Link/Email

## User Interface
### Pages
- [ ] public dashboard
  - [ ] setup
  - [ ] functionality
  - [ ] styling
- [ ] user dashboard with changes of state depending on role
  - [ ] setup
  - [ ] functionality
  - [ ] styling
- [ ] login page with changes of state for registration and password reset request
  - [ ] setup
  - [ ] functionality
  - [ ] styling
- [ ] reset password page
  - [ ] setup
  - [ ] functionality
  - [ ] styling
### Components
- [ ] Login form with changes of state: registration or passsword reset
- [ ] Reset password form
- [ ] Navbar
  - [ ] Login
  - [ ] Logout
- [ ] footer
### UseContext
- [ ] User 
- [ ] Theme (?)

## Testing JSON for routes
### signing up 
{
  "username": "user",

  "email": "`user@user.com`",
  
  "password":"my_very_unique_password",
  
  "roles": ["role1", "role2"]
}
### logging in
{
  "input":"username or email",

  "password":"password"
}

## Problems
- [x] setting the headers