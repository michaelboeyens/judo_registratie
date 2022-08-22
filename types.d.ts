type familyType = {
  email: string;
  email2: string;
  phone: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
};

type baseMemberType = {
  registrationType: "oldMember" | "newMember" | "";
  firstName: string;
  lastName: string;
  birthDate: string;
  other?: string;
};

export type additionalOptionsType = "gJudoka" | "thirdMember";

type additionalInfoType = {
  additionalOptions: additionalOptions[];
  socialMediaAgreement: "yes" | "no";
};

export type memberType = {
  family: familyType;
  member: baseMemberType;
  additionalInfo: additionalInfoType;
};
