type familyType = {
  email: string;
  email2: string;
  phone: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
};

export type registrationType = "oldMember" | "newMember" | "";

type baseMemberType = {
  registrationType: registrationType;
  connectionInfo?: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  other?: string;
};

type additionalOptionsType = "gJudoka" | "thirdMember";

type additionalInfoType = {
  additionalOptions: additionalOptionsType[];
  socialMediaAgreement: "yes" | "no";
};

export type memberType = {
  family: familyType;
  member: baseMemberType;
  additionalInfo: additionalInfoType;
};
