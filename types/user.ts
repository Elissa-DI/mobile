export type SignupData = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

export interface User {
    id: string;
    username: string;
    password: string;
    email?: string;
}