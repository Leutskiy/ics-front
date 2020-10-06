export interface LoginData {
  login: string,
  password: string
}

export interface RegistrationData {
  login: string,
  password: string,
  confirmPassword: string
}

export class User {
    id: number;
    username: string;
    password: string;
    profileId?: number;
    token?: string;
}

export class Contact {
  id: string;
  email: string | null;
  postcode: string | null;
  homePhoneNumber: string | null;
  workPhoneNumber: string | null;
  mobilePhoneNumber: string | null;

  constructor() {
    this.id = "";
    this.email = "";
    this.postcode = "";
    this.homePhoneNumber = "";
    this.workPhoneNumber = "";
    this.mobilePhoneNumber = "";
  }

  public init(
    id: string,
    email: string | null,
    postcode: string | null,
    homePhoneNumber: string | null,
    workPhoneNumber: string | null,
    mobilePhoneNumber: string | null): void {
      this.id = id;
      this.email = email;
      this.postcode = postcode;
      this.homePhoneNumber = homePhoneNumber;
      this.workPhoneNumber = workPhoneNumber;
      this.mobilePhoneNumber = mobilePhoneNumber;
    }
}

export class Job {
  workPlace: string | null;
  position: string | null;

  constructor() {
    this.workPlace = "";
    this.position = "";
  }

  public init(
    workPlace: string | null,
    position: string | null): void {
      this.workPlace = workPlace;
      this.position = position;
    }
}

export class ScientificInfo {
  academicDegree: string | null;
  academicRank: string | null;
  education: string | null;

  constructor() {
    this.academicDegree = "";
    this.academicRank = "";
    this.education = "";
  }

  public init(
    academicDegree: string | null,
    academicRank: string | null,
    education: string | null): void {
      this.academicDegree = academicDegree;
      this.academicRank = academicRank;
      this.education = education;
    }
}

export class Profile {
  id: string;
  userId: string;
  avatar: any[];
  webPages: string[] | null;

  constructor() {
    this.id = "";
    this.userId = "";
    this.avatar = [];
    this.webPages = null;
  }

  public init(
    id: string,
    userId: string,
    avatar: any[],
    webPages: string[] | null): void {
      this.id = id;
      this.userId = userId;
      this.avatar = avatar;
      this.webPages = webPages;
    }
}

export class UserInfo {
  private defaultFieldValue: string = "Не заполнено";
  private defaulAvatarValue: string = "assets/images/avatar.jpg";

  profile: Profile;
  fio: string | null;
  fax: string | null;
  academicDegree: string | null;
  academicRank: string | null;
  education: string | null;
  shortName: string | null;
  workPlace: string | null;
  position: string | null;
  email: string | null;
  mobilePhoneNumber: string | null;
  avatarContent: string | null;

  constructor() {
    this.profile = new Profile();
    this.fio = this.defaultFieldValue;
    this.fax = this.defaultFieldValue;
    this.academicDegree = this.defaultFieldValue;
    this.academicRank = this.defaultFieldValue;
    this.education = this.defaultFieldValue;
    this.shortName = this.defaultFieldValue;
    this.workPlace = this.defaultFieldValue;
    this.position = this.defaultFieldValue;
    this.email = this.defaultFieldValue;
    this.mobilePhoneNumber = this.defaultFieldValue;
    this.avatarContent = null;
  }

  public init(
    fio: string | null,
    fax: string | null,
    avatarBase64String: string | null,
    academicDegree: string | null,
    academicRank: string | null,
    education: string | null,
    shortName: string | null,
    workPlace: string | null,
    position: string | null,
    email: string | null,
    mobilePhoneNumber: string | null): void {
      this.mobilePhoneNumber = mobilePhoneNumber ? mobilePhoneNumber : this.mobilePhoneNumber;
      this.academicDegree = academicDegree ? academicDegree : this.academicDegree;
      this.academicRank = academicRank ? academicRank : this.academicRank;
      this.education = education ? education : this.education;
      this.shortName = shortName ? shortName : this.shortName;
      this.workPlace = workPlace ? workPlace : this.workPlace;
      this.position = position ? position : this.position;
      this.avatarContent = avatarBase64String
        ? `data:image/jpeg;base64,${avatarBase64String}`
        : this.defaulAvatarValue;
      this.email = email ? email : this.email;
      this.fio = fio ? fio : this.fio;
      this.fax = fax ? fax : this.fax;
    }
}

export class StateRegistration {
  id: string;
  inn: string | null;
  ogrnip: string | null;

  constructor() {
    this.id = "";
    this.inn = "";
    this.ogrnip = "";
  }

  public init(
    id: string,
    inn: string | null,
    ogrnip: string | null): void {
      this.id = id;
      this.inn = inn;
      this.ogrnip = ogrnip;
    }
}

export class Organization {
  id: string;
  name: string | null;
  shortName: string | null;
  legalAddress: string | null;
  scientificActivity: string | null;
  stateRegistration: StateRegistration | null

  constructor() {
    this.id = "";
    this.name = "";
    this.shortName = "";
    this.legalAddress = "";
    this.stateRegistration = new StateRegistration();
  }

  public init(
    id: string,
    name: string | null,
    shortName: string | null,
    legalAddress: string | null,
    scientificActivity: string | null,
    stateRegistrationId: string | null,
    inn: string | null,
    ogrnip: string | null): void {
      this.id = id;
      this.name = name;
      this.shortName = shortName;
      this.legalAddress = legalAddress;
      this.scientificActivity = scientificActivity;
      this.stateRegistration.init(stateRegistrationId, inn, ogrnip);
    }
}

export class Employee {
  id: string;
  passport: Passport | null;
  contact: Contact | null;
  organization: Organization | null;
  job: Job | null;
  scientificInfo: ScientificInfo | null;
  stateRegistration: StateRegistration | null;

  constructor() {
    this.id = "";
    this.scientificInfo = new ScientificInfo();
    this.job = new Job();
    this.passport = new Passport();
    this.contact = new Contact();
    this.organization = new Organization();
    this.stateRegistration = new StateRegistration();
  }

  public init(
    id: string,
    academicDegree: string | null,
    academicRank: string | null,
    education: string | null,
    workPlace: string | null,
    position: string | null): void {
      this.id = id;
      this.job.init(workPlace, position);
      this.scientificInfo.init(academicDegree, academicRank, education);
    }
}

export enum Gender {
  male,
  female,
  empty
}

export class Passport {
  id: string;
  nameRus: string;
  nameEng: string;
  surnameRus: string;
  surnameEng: string;
  patronymicNameRus: string;
  patronymicNameEng: string;
  gender: Gender | number | null;
  birthDate: Date | string | null;
  birthPlace: string;
  birthCountry: string;
  residence: string;
  citizenship: string;
  residenceRegion: string;
  residenceCountry: string;
  issueDate: Date | string | null;
  issuePlace: string;
  departmentCode: string;
  identityDocument: string;

  constructor() {
    this.id = "";
    this.nameRus = "";
    this.nameEng = "";
    this.surnameRus = "";
    this.surnameEng = "";
    this.patronymicNameRus = "";
    this.patronymicNameEng = "";
    this.gender = null;
    this.birthDate = null;
    this.birthPlace = "";
    this.birthCountry = "";
    this.residence = "";
    this.citizenship = "";
    this.residenceRegion = "";
    this.residenceCountry = "";
    this.issueDate = null;
    this.issuePlace = "";
    this.departmentCode = "";
    this.identityDocument = "";
  }

  public init(
    id: string,
    nameRus: string,
    nameEng: string,
    surnameRus: string,
    surnameEng: string,
    patronymicNameRus: string,
    patronymicNameEng: string,
    gender: Gender | number | null,
    birthDate: string | null,
    birthPlace: string,
    birthCountry: string,
    residence: string,
    citizenship: string,
    residenceRegion: string,
    residenceCountry: string,
    issueDate: string | null,
    issuePlace: string,
    departmentCode: string,
    identityDocument: string): void {
      this.id = id;
      this.nameRus = nameRus;
      this.nameEng = nameEng;
      this.surnameRus = surnameRus;
      this.surnameEng = surnameEng;
      this.patronymicNameRus = patronymicNameRus;
      this.patronymicNameEng = patronymicNameEng;
      this.gender = gender;
      this.birthDate = birthDate;
      this.birthPlace = birthPlace;
      this.birthCountry = birthCountry;
      this.residence = residence;
      this.citizenship = citizenship;
      this.residenceRegion = residenceRegion;
      this.residenceCountry = residenceCountry;
      this.issueDate = issueDate;
      this.issuePlace = issuePlace;
      this.departmentCode = departmentCode;
      this.identityDocument = identityDocument;
    }
}
