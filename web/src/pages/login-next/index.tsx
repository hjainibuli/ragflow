import SvgIcon from '@/components/svg-icon';
import { useAuth } from '@/hooks/auth-hooks';
import {
  useLogin,
  useLoginChannels,
  useLoginWithChannel,
  useRegister,
} from '@/hooks/use-login-request';
import { useSystemConfig } from '@/hooks/use-system-request';
import { rsaPsw } from '@/utils';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { HeroWaves } from '@/components/hero-waves';
import Spotlight from '@/components/spotlight';
import { Button, ButtonLoading } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BgSvg } from './bg';
import FlipCard3D from './card';
import './index.less';

const Login = () => {
  const [title, setTitle] = useState('login');
  const navigate = useNavigate();
  const { login, loading: signLoading } = useLogin();
  const { register, loading: registerLoading } = useRegister();
  const { channels, loading: channelsLoading } = useLoginChannels();
  const { login: loginWithChannel, loading: loginWithChannelLoading } =
    useLoginWithChannel();
  const { t } = useTranslation('translation', { keyPrefix: 'login' });
  const [isLoginPage, setIsLoginPage] = useState(true);

  const loading =
    signLoading ||
    registerLoading ||
    channelsLoading ||
    loginWithChannelLoading;
  const { config } = useSystemConfig();
  const registerEnabled = config?.registerEnabled !== 0;

  const { isLogin } = useAuth();
  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  const handleLoginWithChannel = async (channel: string) => {
    await loginWithChannel(channel);
  };

  const changeTitle = () => {
    setIsLoginPage(title !== 'login');
    if (title === 'login' && !registerEnabled) {
      return;
    }

    setTimeout(() => {
      setTitle(title === 'login' ? 'register' : 'login');
    }, 200);
  };

  const FormSchema = z
    .object({
      nickname: z.string(),
      email: z
        .string()
        .email()
        .min(1, { message: t('emailPlaceholder') }),
      password: z.string().min(1, { message: t('passwordPlaceholder') }),
      remember: z.boolean().optional(),
    })
    .superRefine((data, ctx) => {
      if (title === 'register' && !data.nickname) {
        ctx.addIssue({
          path: ['nickname'],
          message: 'nicknamePlaceholder',
          code: z.ZodIssueCode.custom,
        });
      }
    });
  const form = useForm({
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
      remember: false,
    },
    resolver: zodResolver(FormSchema),
  });

  const onCheck = async (params: z.infer<typeof FormSchema>) => {
    try {
      const rsaPassWord = rsaPsw(params.password) as string;

      if (title === 'login') {
        const code = await login({
          email: `${params.email}`.trim(),
          password: rsaPassWord,
        });
        if (code === 0) {
          navigate('/');
        }
      } else {
        const code = await register({
          nickname: params.nickname,
          email: params.email,
          password: rsaPassWord,
        });
        if (code === 0) {
          setTitle('login');
        }
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  return (
    <>
      <Spotlight opcity={0.4} coverage={60} color={'rgba(222, 41, 16, 0.9)'} />
      <Spotlight
        opcity={0.3}
        coverage={12}
        X={'10%'}
        Y={'-10%'}
        color={'rgba(222, 41, 16, 0.75)'}
      />
      <Spotlight
        opcity={0.3}
        coverage={12}
        X={'90%'}
        Y={'-10%'}
        color={'rgba(222, 41, 16, 0.75)'}
      />
      <div className="patriotic-login flex h-screen min-h-0 flex-col overflow-hidden">
        <BgSvg isPaused />

        <div className="flex shrink-0 flex-col items-center pt-6 pb-4 w-full text-text-primary overflow-visible">
          <div className="flex items-center mb-2 w-full pl-10">
            <div className="w-12 h-12 p-2 rounded-lg flex items-center justify-center mr-3">
              <img
                src={'/logo.png'}
                alt="logo"
                className="size-8 mr-[12] cursor-pointer"
              />
            </div>
            <div className="welcome-title text-xl font-bold self-center">
              牢记初心，不忘使命
            </div>
          </div>
          <h1 className="welcome-title text-[36px] font-medium text-center mt-6">
            {t('title')}
          </h1>
        </div>
        <div className="relative z-10 flex flex-1 min-h-0 flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          {/* Logo and Header */}

          {/* Login Form */}
          <FlipCard3D isLoginPage={isLoginPage}>
            <div className="flex flex-col items-center justify-center w-full">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-text-primary">
                  {title === 'login' ? t('loginTitle') : t('signUpTitle')}
                </h2>
              </div>
              <div className="w-full max-w-[540px] patriotic-login-card backdrop-blur-sm rounded-2xl shadow-xl pt-14 pl-10 pr-10 pb-2">
                <Form {...form}>
                  <form
                    className="flex flex-col gap-8 text-text-primary "
                    onSubmit={form.handleSubmit(onCheck)}
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>{t('emailLabel')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t('emailPlaceholder')}
                              autoComplete="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {title === 'register' && (
                      <FormField
                        control={form.control}
                        name="nickname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel required>{t('nicknameLabel')}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t('nicknamePlaceholder')}
                                autoComplete="username"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>{t('passwordLabel')}</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={'password'}
                                placeholder={t('passwordPlaceholder')}
                                autoComplete={
                                  title === 'login'
                                    ? 'current-password'
                                    : 'new-password'
                                }
                                {...field}
                              />
                              {/* <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4 text-gray-500" />
                                ) : (
                                  <Eye className="h-4 w-4 text-gray-500" />
                                )}
                              </button> */}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {title === 'login' && (
                      <FormField
                        control={form.control}
                        name="remember"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex gap-2">
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(checked) => {
                                    field.onChange(checked);
                                  }}
                                />
                                <FormLabel
                                  className={cn(' hover:text-text-primary', {
                                    'text-text-disabled': !field.value,
                                    'text-text-primary': field.value,
                                  })}
                                >
                                  {t('rememberMe')}
                                </FormLabel>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <ButtonLoading
                      type="submit"
                      loading={loading}
                      className="patriotic-primary-btn w-full my-8"
                    >
                      {title === 'login' ? t('login') : t('continue')}
                    </ButtonLoading>
                    {title === 'login' && channels && channels.length > 0 && (
                      <div className="mt-3 border">
                        {channels.map((item) => (
                          <Button
                            variant={'transparent'}
                            key={item.channel}
                            onClick={() => handleLoginWithChannel(item.channel)}
                            style={{ marginTop: 10 }}
                          >
                            <div className="flex items-center">
                              <SvgIcon
                                name={item.icon || 'sso'}
                                width={20}
                                height={20}
                                style={{ marginRight: 5 }}
                              />
                              Sign in with {item.display_name}
                            </div>
                          </Button>
                        ))}
                      </div>
                    )}
                  </form>
                </Form>

                {title === 'login' && registerEnabled && (
                  <div className="mt-10 text-right">
                    <p className="text-text-disabled text-sm">
                      {t('signInTip')}
                      <Button
                        variant={'transparent'}
                        onClick={changeTitle}
                        className="patriotic-link-button"
                      >
                        {t('signUp')}
                      </Button>
                    </p>
                  </div>
                )}
                {title === 'register' && (
                  <div className="mt-10 text-right">
                    <p className="text-text-disabled text-sm">
                      {t('signUpTip')}
                      <Button
                        variant={'transparent'}
                        onClick={changeTitle}
                        className="patriotic-link-button"
                      >
                        {t('login')}
                      </Button>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </FlipCard3D>
        </div>
        <HeroWaves />
      </div>
    </>
  );
};

export default Login;
