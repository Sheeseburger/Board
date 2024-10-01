import axiosInstance from '../axios.config';
import {IBoard, IBoardResponse} from '../interfaces/IBoard';

const API_URL = '/board';
export const getBoardById = async (id: string): Promise<IBoardResponse> => {
  if (!id) throw new Error('Board ID is required');

  const response = await axiosInstance.get<IBoardResponse>(`${API_URL}/${id}`);
  return response.data;
};

export const createBoard = async (name: string): Promise<IBoardResponse> => {
  if (!name) throw new Error('Board name is required');

  const response = await axiosInstance.post<IBoardResponse>(API_URL, {name});
  return response.data;
};

export const deleteBoardById = async (id: string): Promise<void> => {
  if (!id) throw new Error('Board ID is required');

  await axiosInstance.delete(`${API_URL}/${id}`);
};
