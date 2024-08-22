export class LoginResponseDto {
  status: string;
  message: string;
  data: {
    access_token: string;
    user: {
      name: string;
      email: string;
    };
  };
}
