import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ClientResponse, Customer } from '@commercetools/platform-sdk';

import {
  addAddress,
  changeAddress,
  changePassword,
  getUser,
  removeAddress,
  updatePersonalData,
} from '../services/setCustomersDetails';
import { notify } from './notifications';

export const meKey = ['me'] as const;

export const useMeQuery = () =>
  useQuery({
    queryKey: meKey,
    queryFn: getUser,
  });

type ProfileUpdate = Record<string, string | boolean | number>;

// The stringly-typed `action` contract comes from the profile forms and dies
// with them in phase 4. Until then one mutation maps action → service call,
// replacing the 148-line switch the UserStore used to carry.
const actionMap: Record<
  string,
  { run: (data: ProfileUpdate) => Promise<ClientResponse<Customer>>; success: string; error: string }
> = {
  removeAddress: {
    run: removeAddress,
    success: 'Address removed successfully',
    error: 'Error occurred while removing an address.',
  },
  changeAddress: {
    run: changeAddress,
    success: 'Address changed successfully',
    error: 'Error occurred while editing an address.',
  },
  addAddress: {
    run: addAddress,
    success: 'Address added successfully',
    error: 'Error occurred while adding an address.',
  },
  changePersonalData: {
    run: (data) => updatePersonalData(data as Record<string, string | number>),
    success: 'Your personal data changed successfully',
    error: 'The email format invalid',
  },
  changePassword: {
    run: (data) => changePassword(data as Record<string, string | number>),
    success: 'Password changed successfully',
    error: 'The given current password does not match',
  },
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProfileUpdate) => {
      const handler = actionMap[`${data.action}`];
      if (!handler) throw new Error(`Unknown profile action: ${data.action}`);

      const me = queryClient.getQueryData<Customer | null>(meKey);
      const current = { ...data, version: me?.version ?? 0 };

      if (data.action === 'changeAddress' && me) {
        const currentAddress = me.addresses.find((item) => item.id === data.id) as unknown as ProfileUpdate;
        return { handler, response: await handler.run({ ...currentAddress, ...current }) };
      }

      return { handler, response: await handler.run(current) };
    },
    onSuccess: ({ handler, response }) => {
      queryClient.setQueryData(meKey, response.body);
      notify({ type: 'success', message: handler.success });
    },
    onError: (error, data) => {
      const handler = actionMap[`${data.action}`];
      notify({ type: 'error', message: handler?.error ?? 'Profile update failed' });
    },
  });
};
