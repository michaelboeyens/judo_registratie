type Family =
  | "email"
  | "email2"
  | "phone"
  | "streetName"
  | "streetNumber"
  | "postalCode"
  | "city";

type familyType = Record<Family, string>;

type baseMemberType = {
  registrationType: "oldMember" | "newMember" | "" | string;
  connectionInfo?: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  other?: string;
};

type additionalInfoType = {
  additionalOptions: ("gJudoka" | "thirdMember")[];
  socialMediaAgreement: "yes" | "no";
};

export type memberType = {
  family: familyType;
  member: baseMemberType;
  additionalInfo: additionalInfoType;
};
