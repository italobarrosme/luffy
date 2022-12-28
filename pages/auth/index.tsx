import { NextPage } from "next";
import AuthtLayout from '@/layouts/AuthLayout'
import { FormAuth } from "@/useCases/FormAuth";

const Auth: NextPage = (props): JSX.Element => {
  return (
    <AuthtLayout title="auth">
      <div className="p-8 rounded-md">
        <FormAuth />
      </div>
    </AuthtLayout>
  );
};

export default Auth;