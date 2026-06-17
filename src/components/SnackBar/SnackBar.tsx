import { useEffect, useState } from 'react';
import { CircleAlert, CircleCheck } from 'lucide-react';

import { useAuthStore } from '../../stores/authStore';
import { subscribeToToasts, Toast } from '../../queries/notifications';
import { cn } from '../../shared/lib/cn';

const SnackBar: React.FC = () => {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => subscribeToToasts(setToast), []);

  const userError = useAuthStore((state) => state.error);
  const userSuccess = useAuthStore((state) => state.success);
  const clearError = useAuthStore((state) => state.clearError);
  const clearSuccess = useAuthStore((state) => state.clearSuccess);

  const error = userError ?? (toast?.type === 'error' ? toast.message : null);
  const success = userSuccess ?? (toast?.type === 'success' ? toast.message : null);

  useEffect(() => {
    if (!error && !success) return undefined;

    const id = setTimeout(() => {
      clearError();
      clearSuccess();
      setToast(null);
    }, 4000);

    return (): void => clearTimeout(id);
  }, [error, success, clearError, clearSuccess]);

  if (!error && !success) return null;

  return (
    <div
      role="alert"
      className={cn(
        'fixed bottom-4 left-4 z-[1400] flex items-center gap-2 rounded px-4 py-3 text-2xl font-semibold text-white shadow-lg',
        error ? 'bg-error' : 'bg-success'
      )}
    >
      {error ? <CircleAlert size={28} /> : <CircleCheck size={28} />}
      {error ?? success}
    </div>
  );
};

export default SnackBar;
