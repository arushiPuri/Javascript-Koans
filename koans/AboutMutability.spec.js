require('chai-jasmine');

describe("About Mutability", function() {

  it("should expect object properties to be public and mutable", function () {
    var aPerson = {firstname: "John", lastname: "Smith" };
    aPerson.firstname = "Alan";

    expect(aPerson.firstname).toBe("Alan");
  });

  it("should understand that constructed properties are public and mutable", function () {
    class Person {
      constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
      }
    }

    var aPerson = new Person ("John", "Smith");
    aPerson.firstname = "Alan";


    expect(aPerson.firstname).toBe("Alan");
  });

  it("should expect prototype properties to be public and mutable", function () {
    class Person {
      constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
      }

      getFullName() {
        return this.firstname + " " + this.lastname;
      }
    }

    var aPerson = new Person ("John", "Smith");
    // var aPerson = new Perso

    expect(aPerson.getFullName()).toBe("John Smith");
    aPerson.getFullName = function () {
      return this.lastname + ", " + this.firstname;
    };

    expect(aPerson.getFullName()).toBe("Smith, John");
  });

  it("should know that variables inside a constructor and constructor args are private", function () {
    class Person {
      constructor(firstname, lastname) {
        var fullName = firstname + " " + lastname;

        this.getFirstName = function () { return firstname; };
        this.getLastName = function () { return lastname; };
        this.getFullName = function () { return fullName; };
      }
    }
    var aPerson = new Person ("John", "Smith");

    aPerson.firstname = "Penny";
    aPerson.lastname = "Andrews";
    aPerson.fullName = "Penny Andrews";

    expect(aPerson.getFirstName()).toBe("John");
    expect(aPerson.getLastName()).toBe("Smith");
    expect(aPerson.getFullName()).toBe("John Smith");

    aPerson.getFullName = function () {
      return aPerson.lastname + ", " + aPerson.firstname;
    };

    expect(aPerson.getFullName()).toBe("Andrews, Penny");
  });

});
