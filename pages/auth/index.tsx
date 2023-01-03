import { NextPage } from "next";
import AuthtLayout from '@/layouts/AuthLayout'
import { FormAuth } from "@/useCases/FormAuth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useStoreListToast } from "@/store/useStoreListToast";
import { useSession } from "next-auth/react";

const Auth: NextPage = () => {

  const { addToast } = useStoreListToast();
  const { data: session, status } = useSession();

  const router = useRouter();
  const query = router.query;

  
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/purchase-request')
    }

    if (query.error) {
      addToast({
        type: 'error',
        title: 'Erro ao realizar login',
        message: 'Usuário ou senha inválidos',
        duration: 8000
      })
    }

    

  }, [query.error])

  
  return (
    <AuthtLayout title="auth">
      <div className="p-8 rounded-md">
        <FormAuth />
      </div>
    </AuthtLayout>
  );
};

export default Auth;