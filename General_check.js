describe('Cookies banner check', () => {
  beforeEach(() => {
    // cy.viewport(1024, 768)
    cy.viewport(1680, 1050)
    
    })
 
  it('Check the text in cookies banner', () => {
    cy.visit('https://www.feefo.com')
    cy.get('#hs-eu-cookie-confirmation-inner')
      .should('contain', 'We use cookies to allow us to analyse how many people are visiting our website and what pages they are looking at. This information allows us to continually develop and improve our website. Learn more \n              If you decline, your information won’t be tracked when you visit this website. A single cookie will be used in your browser to remember your preference not to be tracked.')
      .and('be.visible')
  })

  it('Check the Learn more link in cookies banner', () => {
    cy.contains('Learn more')
      .should('have.attr', 'href')
      .and('contain', 'https://www.feefo.com/en/business/privacy-policy')
    //cy.contains('Learn more')  
    //  .click()
  })

  it('Check the Decline button in cookies banner', () => {
    cy.get('#hs-eu-decline-button')
      .should('contain', 'Decline')
      .and('be.visible')
  })

  it('Click the Decline button in cookies banner', () => {
    cy.get('#hs-eu-decline-button')
      .click()    
  })

  it('Check the cookies banner is closed', () => {
    cy.get('#hs-eu-cookie-confirmation-inner')
      //.should('not.exist')
      .should('be.not.visible')
  })

  it('Reload the page', () => {
    cy.reload()   
  })

  it('Check the Accept button in cookies banner', () => {
    cy.get('#hs-eu-confirmation-button')
      .should('contain', 'Accept')
      .and('be.visible')
  })

  //Some times the clicking of the Accept button results in error. In this case please restart the whole test
  it('Click the Accept button in cookies banner', () => {
    cy.get('#hs-eu-confirmation-button')
      .click()    
  })

  it('Check the cookies banner is closed', () => {
    cy.get('#hs-eu-cookie-confirmation-inner')
      //.should('not.exist')
      .should('be.not.visible')
  })
})

describe('Headers check', () => {
  beforeEach(() => {
   // cy.viewport(1024, 768)
   cy.viewport(1680, 1050)
   })
   

  it('Logo check', () => {
    cy.get('.hs-image-widget')
      .should('exist')
      .and('be.visible')
      .and('have.attr', 'src')
      .and('contain', 'https://site.feefo.com/hubfs/feefo_logo.svg')
    
    })

    it('Logo link check', () => {
    cy.get('#hs-link-module_1641815928381190_')
      .should('have.attr', 'href')
      .and('contain', 'https://www.feefo.com')
    cy.get('#hs-link-module_1641815928381190_')
      .click()
    cy.get('#hs-eu-confirmation-button')
      .click()  
    })
    
    it('Product page check', () => {
      cy.get('.header-menu-dropdown > .dropdown-button > a')
        .first()
        .contains('Products')
        .should('have.attr', 'href')
        .and('include', 'https://www.feefo.com/en/business/products')
      //cy.get(['href="https://www.feefo.com/en/business/products"'])
      //  .click()        //doesnt work
      cy.get('.header-menu-dropdown > .dropdown-button > a')
        .click()          //Open the product page
      cy.url()
        .should('eq', 'https://www.feefo.com/en/business/products')
      cy.title() 
       .should('eq', 'Feefo Products')
      })  

    
})

describe('Login Page', () => {
  beforeEach(() => {
   // cy.viewport(1024, 768)
   cy.viewport(1680, 1050)
   })
   beforeEach(() => {
    cy.OpenLoginPage()
    })
   

  it('Login Page load succesfully', () => {
   
    cy.get('.login-page__aside')            //check side content
      .should('be.visible')
    cy.get('.login-form-section__logo')     //check Logo
      .should('be.visible')
    cy.get('.login-form-section__title')    //check Login label
      .contains('Log in')
      .should('be.visible')
    cy.contains('Email Address')         //check Email label
      .should('be.visible')  
    cy.get(':nth-child(1) > .aui-input-text')   //check Email field
      .should('be.empty')
      .and('be.visible')
    cy.contains('Password')              //check Password label    
      .should('be.visible')
      .and('exist')
    cy.get(':nth-child(2) > .aui-input-text')   //check Password field
      .should('be.empty')
      .and('be.visible')
    cy.get('.login-page-form__submit-btn')
      .should('exist')
     // .and('have_attr', 'disabled')
    cy.contains('Forgot password?')   //check Forgot password page link
      .should('have.attr', 'href')
    cy.get('.login-page-form__footer')    //check Login footer label
      .contains(' Trouble logging in? Check our ')
    cy.get('[href="http://status.feefo.com/"]')   //check status page link
      .contains('status page')
    cy.get('[href="mailto:support@feefo.com"]')  //check support link
      .contains('get in touch')
    cy.get('[href="https://feefo.com/en/business/terms"]')  //check Terms link
      .contains('Terms')
    cy.get('[href="https://www.feefo.com/en/business/privacy-policy"]')  //check Privacy policy link
      .contains('Privacy Policy')  
    cy.get('[href="https://www.feefo.com/en/business/data-protection"]')  //check Data protection link
      .contains('Data Protection')

  })

  it('Forgot password page check', () => {

    cy.contains('Forgot password?')   //check Forgot password page link
      .should('have.attr', 'href')
    cy.contains('Forgot password?')  //check the link
      .click()
    //cy.url().should('eq', 'https://hub.feefo.com/login')
      cy.location().should((loc) => {       //Check the URL
      expect(loc.href).to.eq(
        'https://hub.feefo.com/login'
      )
    }) 
    cy.get('.login-page__aside')            //check side content
      .should('be.visible')
    cy.get('.login-form-section__logo')     //check Logo
      .should('be.visible')  
    cy.get('.login-form-section__title')  //Check the title
      .contains('Forgot your password?')
    cy.get('.aui-input-text')   // Enter wrong email
      .should('exist')
      .and('be.visible')
      .clear()
      .type('123')
    cy.get('.ng-scope')     
      .contains('Please enter a valid email address.')  //The error message should be visible
      .should('be.visible')      
    cy.get('.aui-input-text')       //Enter correct email
      .clear()
      .type('123@abv.bg')
    cy.get('.ng-scope')   
      .contains('Please enter a valid email address.')  //The error message should not exist
      .should('not.exist')    
    cy.get('.login-page-form__submit-btn')
      .contains('Request Reset Link')
    //  .click()              // I dont want to run the request for FP in the moment
    cy.get('[href="https://feefo.com/en/business/terms"]')  //check Terms link
      .contains('Terms')
    cy.get('[href="https://www.feefo.com/en/business/privacy-policy"]')  //check Privacy policy link
      .contains('Privacy Policy')  
    cy.get('[href="https://www.feefo.com/en/business/data-protection"]')  //check Data protection link
      .contains('Data Protection')
    cy.get('.login-page-form__footer > a')    //Check the button for return to Login page
      .contains('Back to login ')
      .click()
    cy.get('.login-form-section__title')  //Check the title
      .contains('Log in')
    cy.get(':nth-child(1) > .aui-input-text') // Email input field is visible
      .should('be.visible')
    cy.get(':nth-child(2) > .aui-input-text') // Password input field is visible
      .should('be.visible')  
    cy.get('.login-page-form__submit-btn')  // Log in button is visible
      .should('be.visible')    
     

  })

  it('Status page link check', () => {
   
    cy.get('[href="http://status.feefo.com/"]')   //check status page link
      .contains('status page')   
    
    const staticResponse = {statusCode: 200}
      
    cy.intercept("http://status.feefo.com/", (req) => {
      req.reply(staticResponse)
    })
  })

  it('Get in touch page check', () => {
   
    cy.get('[href="mailto:support@feefo.com"]')  //check support link
      .contains('get in touch')
    const staticResponse = {statusCode: 200}
      
    cy.intercept("mailto:support@feefo.com", (req) => {
      req.reply(staticResponse)
    })
    
  })

  it('Terms page check', () => {
   
    cy.get('[href="https://feefo.com/en/business/terms"]')  //check Terms link
      .contains('Terms')

    const staticResponse = {statusCode: 200}
    
    cy.intercept("https://feefo.com/en/business/terms", (req) => {
    req.reply(staticResponse)
   })
  })

  
  it('Privacy Policy page check', () => {
   
    cy.get('[href="https://www.feefo.com/en/business/privacy-policy"]')  //check Privacy policy link
      .contains('Privacy Policy')  
      const staticResponse = {statusCode: 200}
    
      cy.intercept("https://www.feefo.com/en/business/privacy-policy", (req) => {
      req.reply(staticResponse)
     })

  })

  
  it('Data Protection page check', () => {
   
    cy.get('[href="https://www.feefo.com/en/business/data-protection"]')  //check Data protection link
      .contains('Data Protection')
      const staticResponse = {statusCode: 200}
    cy.intercept("https://www.feefo.com/en/business/data-protection", (req) => {
      req.reply(staticResponse)
     })

  })

  it('Email field check with wrong email1', () => {
   
    cy.fixture('feefoLogin.json').then(data => {      //enter the email from the fixture file
      cy.get(':nth-child(1) > .aui-input-text')
      .type(data.wrongEmail1)
      .should('have.value', data.wrongEmail1)
    cy.get('.ng-scope')
      .contains('Please enter a valid email address.')  
      .should('be.visible')
    cy.get('.login-page-form__submit-btn')
      .click()  
    cy.location().should((loc) => {
      expect(loc.href).to.eq(
        'https://hub.feefo.com/login'
      )
  })
  })
  })

  it('Email field check with wrong email2', () => {
   
    cy.fixture('feefoLogin.json').then(data => {        //enter the email from the fixture file
      cy.get(':nth-child(1) > .aui-input-text')
      .clear()
      .type(data.wrongEmail2)
      .should('have.value', data.wrongEmail2)
    })
    cy.get('.ng-scope')
      .contains('Please enter a valid email address.')  
      .should('be.visible')
    cy.get('.login-page-form__submit-btn')
      .click()  
    cy.location().should((loc) => {
      expect(loc.href).to.eq(
        'https://hub.feefo.com/login'
      )
      
      })
  })

  it('Email field check with email3', () => {
   
    cy.fixture('feefoLogin.json').then(data => {
      cy.get(':nth-child(1) > .aui-input-text')
      .clear()
      .type(data.wrongEmail3)
      .should('have.value', data.wrongEmail3)
    })
    cy.get('.ng-scope')
      .contains('Please enter a valid email address.')  
      .should('not.exist')
    cy.get('.login-page-form__submit-btn')
      .click()  
    cy.location().should((loc) => {
      expect(loc.href).to.eq(
        'https://hub.feefo.com/login'
      )
      
      })
  })

  it('Email field check with wrong email4', () => {
   
    cy.fixture('feefoLogin.json').then(data => {        //enter the email from the fixture file
      cy.get(':nth-child(1) > .aui-input-text')
      .clear()
      .type(data.wrongEmail4)
      .should('have.value', data.wrongEmail4)
    })
    cy.get('.ng-scope')
      .contains('Please enter a valid email address.')  
      .should('be.visible')
    cy.get('.login-page-form__submit-btn')
      .click()  
    cy.location().should((loc) => {
      expect(loc.href).to.eq(
        'https://hub.feefo.com/login'
      )
      
      })
  })  

  it('Email field check with email5', () => {       
   
    cy.fixture('feefoLogin.json').then(data => {      //enter the email from the fixture file
      cy.get(':nth-child(1) > .aui-input-text')
      .clear()
      .type(data.wrongEmail5)
      .should('have.value', data.wrongEmail5)
    })
    cy.get('.ng-scope')
      .contains('Please enter a valid email address.')  
      .should('not.exist')
    cy.get('.login-page-form__submit-btn')
      .click()
    cy.location().should((loc) => {
       expect(loc.href).to.eq(
          'https://hub.feefo.com/login'
        )
        
        })  
      
  })

  it('Email field check with email', () => {
   
    cy.fixture('feefoLogin.json').then(data => {   //enter the email from the fixture file
    cy.get(':nth-child(1) > .aui-input-text')
      .clear()
      .type(data.email)
      .should('have.value', data.email)
    })
    cy.get('.ng-scope')
      .contains('Please enter a valid email address.')  
      .should('not.exist')
    cy.get('.login-page-form__submit-btn')
      .click()
    cy.location().should((loc) => {
        expect(loc.href).to.eq(
          'https://hub.feefo.com/login'
        )
            
      })  
          
  })

  it('Email field check after clearing email record', () => {
   
    cy.fixture('feefoLogin.json').then(data => { //enter the email from the fixture file
    cy.get(':nth-child(1) > .aui-input-text')
      .clear()
      .type(data.email)
      .should('have.value', data.email)
    })
    cy.get('.ng-scope')
      .contains('Please enter a valid email address.')  
      .should('not.exist')
    cy.get(':nth-child(1) > .aui-input-text')   //clear the email input
      .clear()
    cy.get('.ng-scope')
      .contains('Please enter a valid email address.')  
      .should('be.visible')          
  })

  it('Password field check after clearing email record', () => {
   
    cy.fixture('feefoLogin.json').then(data => { //enter the password from the fixture file
    cy.get(':nth-child(2) > .aui-input-text')
      .clear()
      .type(data.Password1)
      .should('have.value', data.Password1)
    })
    cy.get('.ng-scope')
      .contains('Please enter your password.')  
      .should('not.exist')
    cy.get(':nth-child(2) > .aui-input-text')   //clear the password input
      .clear()
    cy.get('.ng-scope')
      .contains('Please enter your password.')  
      .should('be.visible')          
  })

  it('Valid email and password', () => {
   
    cy.fixture('feefoLogin.json').then(data => { //enter the password from the fixture file
    cy.get(':nth-child(1) > .aui-input-text')
      .clear()
      .type(data.email)
      .should('have.value', data.email)
    cy.get('.ng-scope')
      .contains('Please enter a valid email address.')  
      .should('not.exist')
      cy.get(':nth-child(2) > .aui-input-text')
      .clear()
      .type(data.Password1)
      .should('have.value', data.Password1)
    })
    cy.get('.ng-scope')
      .contains('Please enter your password.')  
      .should('not.exist')
    cy.get('.login-page-form__submit-btn')
      .click()
    cy.contains('An account cannot be found for the email address and password provided, please try again or contact your account administrator for further assistance.')
      .should('be.visible')          
  })

  

  
})

describe('API check', () => {
  beforeEach(() => {
   // cy.viewport(1024, 768)
   cy.viewport(1680, 1050)
   })
   

  it('Login API with wrong credentials', () => {
    cy.request({
      method: 'POST',
      url: 'https://hub.feefo.com/api/login',
      failOnStatusCode: false,
      body: {
        "email": "mrlaeksiev85@gmail.com",
        "password":"Test"
      }

    }).then((res)=>{
      expect(res.status).to.be.eq(401)
      expect(res.body).to.contains('Incorrect email or password')
    })
    
  })
  
  it('Login API without email', () => {
    cy.request({
      method: 'POST',
      url: 'https://hub.feefo.com/api/login',
      failOnStatusCode: false,
      body: {
          //"email": "mrlaeksiev85",
          "password":"Test"
        }
  
      }).then((res)=>{
        expect(res.status).to.be.eq(400)
        expect(res.body).to.contains('Require email and password to login')
      })
    })

  it('Login API without password', () => {
    cy.request({
      method: 'POST',
      url: 'https://hub.feefo.com/api/login',
      failOnStatusCode: false,
      body: {
            "email": "mrlaeksiev85",
            //"password":"Test"
          }
    
      }).then((res)=>{
        expect(res.status).to.be.eq(400)
        expect(res.body).to.contains('Require email and password to login')
    })
   }) 
  
  it('Login API without email and password', () => {    
  cy.request({                                          
         method: 'POST',                               
    url: 'https://hub.feefo.com/api/login',
    failOnStatusCode: false,
    body: {
            //"email": "mrlaeksiev85",
            //"password":"Test"
          }
    
      }).then((res)=>{
        expect(res.status).to.be.eq(400)
        expect(res.body).to.contains('Require email and password to login')
    })
   })  
    
})
 




