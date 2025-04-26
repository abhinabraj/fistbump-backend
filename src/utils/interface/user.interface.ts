export interface User {
  name: string;
  email: string;
  picture: string;
  googleProfileId: string;
  password?: string;
  id?: number;
}

export interface GoogleUserProfile {
  id: string;
  displayName: string;
  name: { familyName: string; givenName: string };
  emails: { value: string; verified: boolean }[];
  photos: {
    value: string;
  }[];
  provider: string;
}
