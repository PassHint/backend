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
      code: 2100,
      message: "You are not logged in."
    }
  },
  hint: {
    create: {
      missingParams: {
        code: 3000,
        message: "Source and content are required."
      },
      unexpected: {
        code: 3001,
        message: "It was not possible to craete your hint. An unexpected error happened."
      },
      alreadyExists: {
        code: 3002,
        message: "You already have a saved hint to this source."
      }
    },
    list: {
      unexpected: {
        code: 3100,
        message: "It was not possible to list your hints. An unexpected error happened."
      },
    },
    find: {
      notFound: {
        code: 3200,
        message: "Hint with the provided id was not found."
      }
    }
  }
}

export default ErrorHelper;
