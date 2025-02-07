import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export const useGetData = (endpoint, queryKey) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => api.get(endpoint).then(res => res.data)
  });
};

export const usePostData = (endpoint, queryKey) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data) => api.post(endpoint, data),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    }
  });
};

export const useUpdateData = (endpoint, queryKey) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data) => api.put(`${endpoint}/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    }
  });
};

export const useDeleteData = (endpoint, queryKey) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => api.delete(`${endpoint}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    }
  });
}; 