import type { BtnAuthType } from '../api/users';

interface IProps {
  permission: BtnAuthType[];
  children: React.ReactNode;
}
function Permission(props: IProps) {
  const { permission, children } = props;
  const userPermission = JSON.parse(sessionStorage.getItem('btnAuth') || '[]');
  const hasPermission = permission.every(item => userPermission.includes(item));
  if (!hasPermission) return null;
  return <>{children}</>;
}

export default Permission;
