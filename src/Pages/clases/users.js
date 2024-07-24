// Users.js
export class User {
  constructor(email, pass, role = 'u') {
    this.email = email;
    this.pass = pass;
    this.role = role;
  }

  displayInfo() {
    return `Email: ${this.email}, Role: ${this.role}`;
  }
}

export class Client extends User {
  constructor(email, pass) {
    super(email, pass, 'c');
  }
}

export class Staff extends User {
  constructor(email, pass) {
    super(email, pass, 's');
  }
}

export class Admin extends Staff {
  constructor(email, pass) {
    super(email, pass, 'a');
  }
}
