import { Icon } from '@iconify/react';
import { signIn } from 'next-auth/react';
import { FormEventHandler, useState} from 'react';

export const FormAuth = () => {

  const [userInfo, setUserInfo] = useState({ user: "", password: "" });
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {

    e.preventDefault();

    signIn("credentials", {
      user: userInfo.user,
      pass: userInfo.password,
    })
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <h1 className='text-brand-accent font-bold text-center text-4xl'>
            IPOG
          </h1>
          <div>
            <h2 className='text-brand-light text-center text-1xl'>
              ACESSO AO PAINEL ADMINISTRATIVO
            </h2>
          </div>
          <div className="flex gap-2 w-full justify-center items-center">
            <label htmlFor="email">
              <Icon icon={'mdi:user'}  width="24" className='text-white' />
            </label>
            <input
              name="email"
              className="border-2 border-brand-dark p-2 rounded-md"
              value={userInfo.user}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, user: target.value })
              }
              type="text"
            />
          </div>
          <div className="flex gap-2 w-full justify-center items-center">
            <label htmlFor="password">
              <Icon icon={'material-symbols:lock'}  width="24" className='text-white'/> 
            </label>
            <input
              name="password"
              className="border-2 border-brand-dark p-2 rounded-md"
              value={userInfo.password}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, password: target.value })
              }
              type="text"
            />
          </div>
          <div className="flex gap-2 w-full justify-center items-center">
            <button type="submit" className="bg-brand-accent p-2 rounded-md font-bold text-white">
              ACESSAR PAINEL
            </button>
          </div>
        </form>
  );
}