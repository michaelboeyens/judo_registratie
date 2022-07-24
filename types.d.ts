export type familyType = {
  email: string;
  phone: string;
  streetName: string;
  postalCode: string;
  city: string;
};
export type baseMemberType = {
  registrationType: "oldMember" | "newMember" | "";
  gJudoka: boolean;
  firstName: string;
  lastName: string;
  birthDate: string;
  other?: string;
};

export type memberType = {
  family: familyType;
  member: baseMemberType;
};
