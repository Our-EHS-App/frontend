import { useApi } from '@hooks';
import { IPage } from '@interfaces/IPage';
import { Page } from '@interfaces/ICommon';
import { useParams } from 'react-router-dom';

const API_URL = '/private/form';

export const usePage = () => {
  const { apiPrivate } = useApi();
  const { uuid } = useParams();

  const addPage = async (body: IPage) => {
    const { data } = await apiPrivate.post(`${API_URL}/${uuid}/page`, body);
    return data;
  };

  const getPages = async (uuid?: string) => {
    const { data } = await apiPrivate.get<Page<IPage>>(
      `${API_URL}/${uuid}/page`
    );
    return data;
  };

  const getPage = async (formUuid: string, pageUuid: string) => {
    const { data } = await apiPrivate.get<IPage>(
      `${API_URL}/${formUuid}/page/${pageUuid}`
    );
    return data;
  };

  const editPage = async (body: IPage) => {
    const { data } = await apiPrivate.put(`${API_URL}/${uuid}/page`, body);
    return data;
  };

  const createContentPage = async (body: IPage) => {
    const { data } = await apiPrivate.put(
      `${API_URL}/${uuid}/page/content`,
      body
    );
    return data;
  };

  const pageOrderDTO = async (body: IPage[]) => {
    const { data } = await apiPrivate.put(
      `${API_URL}/${uuid}/page/sorting`,
      body
    );
    return data;
  };

  const deletePageById = async (pageUuid?: string) => {
    const { data } = await apiPrivate.delete(
      `${API_URL}/${uuid}/page/${pageUuid}`
    );
    return data;
  };

  return {
    addPage,
    getPages,
    getPage,
    editPage,
    deletePageById,
    createContentPage,
    pageOrderDTO,
  };
};
