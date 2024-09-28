import axiosInstance from '../axios.config';
import {IBoardResponse} from '../interfaces/IBoard';

const API_URL = '/board';
export const getBoardById = async (id: string): Promise<IBoardResponse> => {
  if (!id) throw new Error('Board ID is required');

  const response = await axiosInstance.get<IBoardResponse>(`${API_URL}/${id}`);
  return response.data;
};

export const createBoard = async (
  boardData: Omit<IBoardResponse, '_id'>
): Promise<IBoardResponse> => {
  if (!boardData.name) throw new Error('Board name is required');

  const response = await axiosInstance.post<IBoardResponse>(API_URL, boardData);
  return response.data;
};

export const deleteBoardById = async (id: string): Promise<void> => {
  if (!id) throw new Error('Board ID is required');

  await axiosInstance.delete(`${API_URL}/${id}`);
};
