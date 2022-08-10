type familyType = {
  email: string;
  phone: string;
  streetName: string;
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
