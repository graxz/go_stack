interface CreateUserData {
  name?: string;
  email: string;
  password: string;
}

export default function createUser({ name, email, password }: CreateUserData){
  const user = {
    name,
    password,
    email
  }
  return user
}