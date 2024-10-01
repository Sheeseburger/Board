import axiosInstance from '../axios.config';
import {ICard} from '../interfaces/ICard';

const API_URL = '/board';

export const createCard = async (
  boardId: string | undefined,
  columnId: string | undefined,
  cardData: Omit<ICard, '_id'>
): Promise<ICard> => {
  if (!boardId || !columnId) throw new Error('Board ID and Column ID are requested');
  const response = await axiosInstance.post<ICard>(
    `${API_URL}/${boardId}/columns/${columnId}/cards`,
    cardData
  );
  return response.data;
};

export const changeCardColumn = async (
  cardId: string,
  sourceId: string,
  destinationId: string,
  boardId: string
): Promise<ICard> => {
  if (!sourceId || !destinationId) throw new Error('Board ID and Column ID are requested');

  const response = await axiosInstance.patch<ICard>(
    `${API_URL}/${boardId}/columns/${sourceId}/cards`,
    {cardId, targetColumnId: destinationId}
  );
  return response.data;
};

export const deleteCard = async (cardId: string, boardId: string, columnId: string) => {
  if (!boardId || !columnId || !cardId) throw new Error('Not all ids provided');
  const response = await axiosInstance.delete<never>(
    `${API_URL}/${boardId}/columns/${columnId}/cards/${cardId}`
  );
  return response;
};

export const patchCard = async (
  cardId: string,
  boardId: string,
  columnId: string,
  data: Omit<ICard, '_id'>
) => {
  const response = await axiosInstance.patch<ICard>(
    `${API_URL}/${boardId}/columns/${columnId}/cards/${cardId}`,
    data
  );
  return response.data;
};
