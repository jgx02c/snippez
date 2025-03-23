/**
 * Person is the super class to Doctor and Patient.
 *
 * @file This defines the Person class.
 * @author Allan Manangan
 */
class Person {
  constructor( idNum, firstStr, lastStr, dateOfBirthStr, emailAddressStr, phoneNumberStr, genderStr ) {
    this.id = idNum;
    this.firstName = firstStr;
    this.lastName = lastStr;
    this.dateOfBirth = dateOfBirthStr;
    this.emailAddress = emailAddressStr;
    this.phoneNumber = phoneNumberStr;
    this.gender = genderStr;
  }

  /**
   * This returns a Person's full name.
   *
   * @returns {string} The concatenation of first and last names.
   */
  fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  /**
   * This prints a Person's full name.
   *
   */
  printName() {
    console.log( "Person.printName():", this.fullName() );
  }
}

// We export the class.
export default Person;