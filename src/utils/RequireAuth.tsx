import type { RootState } from '@/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface IProps {
  allowed: boolean; // 登录时是否允许访问(true: 登录时允许访问，未登录时不允许访问；false: 登录时不允许访问，未登录时允许访问)
  redirectTo: string; // 不允许访问时跳转的路径
  children: React.ReactNode;
}

function RequireAuth(props: IProps) {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();
  const { allowed, redirectTo, children } = props;
  const isLogin = !!token;

  useEffect(() => {
    if (isLogin !== allowed) {
      navigate(redirectTo);
    }
  }, [allowed, isLogin, redirectTo]);

  return isLogin !== allowed ? null : <>{children}</>;
}

export default RequireAuth;
