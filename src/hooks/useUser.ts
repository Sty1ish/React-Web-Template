import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService, type User } from '@/services/user';
import toast from 'react-hot-toast';

/**
 * 사용자 정보 조회 훅
 */
export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => userService.getUser(userId),
    enabled: !!userId, // userId가 있을 때만 실행
  });
};

/**
 * 현재 로그인한 사용자 정보 훅
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => userService.getCurrentUser(),
  });
};

/**
 * 사용자 정보 업데이트 훅
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      userService.updateUser(id, data),
    onSuccess: (updatedUser) => {
      // 캐시 업데이트
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('사용자 정보가 업데이트되었습니다.');
    },
    onError: (error) => {
      toast.error('업데이트에 실패했습니다.');
      console.error('Update user error:', error);
    },
  });
};

/**
 * 사용자 삭제 훅
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('사용자가 삭제되었습니다.');
    },
    onError: (error) => {
      toast.error('삭제에 실패했습니다.');
      console.error('Delete user error:', error);
    },
  });
};
