type family = {
  email: string;
  phone: string;
  streetName: string;
  postalCode: string;
  city: string;
};
type member = {
  registrationType: "oldMember" | "newMember";
  firstName: string;
  lastName: string;
  birthDate: string;
  other: string;
};

export type memberType = {
  family: family;
  member: member;
};
