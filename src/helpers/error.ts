const ErrorHelper = {
  unexpected: {
    code: 1,
    message: "An unexpected error happened."
  },
  user: {
    create: {
      missingParams: {
        code: 1000,
        message: "Username and password are required."
      },
      weakPassword: {
        code: 1001,
        message: "The password is weak. The password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit and one special character."
      }
    }
  },
  auth: {
    login: {
      missingParams: {
        code: 2000,
        message: "Username and password are required."
      },
      userNotFound: {
        code: 2001,
        message: "User not found."
      },
      wrongPassword: {
        code: 2002,
        message: "Invalid password."
      }
    },
    unauthorized: {
      code: 3001,
      message: "You are not logged in."
    }
  }
}

export default ErrorHelper;
