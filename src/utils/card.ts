import axiosInstance from '../axios.config';
import {ICard} from '../interfaces/ICard';

const API_URL = '/board';

export const createCard = async (
  boardId: string | undefined,
  columnId: string | undefined,
  cardData: Omit<ICard, '_id'>
): Promise<ICard> => {
  if (!boardId || !columnId)
    throw new Error('Board ID and Column ID are requested');
  const response = await axiosInstance.post<ICard>(
    `${API_URL}/${boardId}/columns/${columnId}/cards`,
    cardData
  );
  return response.data;
};
