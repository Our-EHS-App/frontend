import { useApi } from '@hooks';
import { Page } from '@interfaces/ICommon';
import { IForm } from '@interfaces/IForm';
import { SurveyI, AdvancedSurveyI } from '@interfaces/ISurvey';

const API_URL = '/private/form';

const SURVEY_URL = '/private/survey';

export const useSurveyForm = () => {
  const { apiPrivate } = useApi();

  const getForms = async (params?: any) => {
    const { data } = await apiPrivate.get<Page<IForm>>(API_URL, {
      params,
    });
    return data;
  };

  const getFormById = async (uuid?: string) => {
    const { data } = await apiPrivate.get<IForm>(`${API_URL}/${uuid}`);
    return data;
  };

  const deleteFormById = async (uuid?: string) => {
    const { data } = await apiPrivate.delete(`${API_URL}/${uuid}`);
    return data;
  };

  const addForm = async (body: IForm) => {
    const { data } = await apiPrivate.post(API_URL, body);
    return data;
  };

  const copyForm = async (body: IForm) => {
    const { data } = await apiPrivate.post(API_URL, body);
    return data;
  };

  const getAssignedFormById = async (uuid?: string) => {
    const { data } = await apiPrivate.get<IForm>(`${API_URL}/${uuid}`);
    return data;
  };

  const addSurvey = async (body: SurveyI) => {
    const { data } = await apiPrivate.post(SURVEY_URL, body);
    return data;
  };

  const editSurvey = async (body: SurveyI) => {
    const { uuid } = body;
    const { data } = await apiPrivate.put(`${SURVEY_URL}/${uuid}`, body);
    return data;
  };

  const getSurvey = async (surveyUuid: string, formUuid: string) => {
    const { data } = await apiPrivate.get<SurveyI>(
      `${SURVEY_URL}/${surveyUuid}/form/${formUuid}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return data;
  };

  const addAdvancedSurvey = async (body: AdvancedSurveyI) => {
    const { data } = await apiPrivate.post(SURVEY_URL, body);
    return data;
  };

  const editAdvancedSurvey = async (body: AdvancedSurveyI) => {
    const { uuid } = body;
    const { data } = await apiPrivate.put(`${SURVEY_URL}/${uuid}`, body);
    return data;
  };

  const getAdvancedSurvey = async (surveyUuid: string, formUuid: string) => {
    const { data } = await apiPrivate.get<AdvancedSurveyI>(
      `${SURVEY_URL}/${surveyUuid}/form/${formUuid}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return data;
  };

  const editForm = async (body: IForm) => {
    const { data } = await apiPrivate.put(API_URL, body);
    return data;
  };

  const deleteSurveyById = async (uuid?: string) => {
    const { data } = await apiPrivate.delete(`${SURVEY_URL}/${uuid}`);
    return data;
  };

  return {
    getForms,
    addForm,
    editForm,
    getFormById,
    copyForm,
    deleteFormById,
    addSurvey,
    editSurvey,
    getSurvey,
    deleteSurveyById,
    addAdvancedSurvey,
    editAdvancedSurvey,
    getAdvancedSurvey,
    getAssignedFormById,
  };
};
