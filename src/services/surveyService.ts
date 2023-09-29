import { useApi } from '../hooks';
import { Page } from '../interfaces/ICommon';
import { IForm } from '../interfaces/IForm';
import { SurveyI, AdvancedSurveyI } from '../interfaces/ISurvey';

const API_URL = '/private/form';

const SURVEY_URL = '/private/survey';

export const useSurveyForm = () => {
  const { apiPrivate, apiPublic } = useApi();

  const getForms = async (params?: any) => {
    const { data } = await apiPrivate.get<any>('/api/templates', {
      params,
    });
    return data;
  };

  const getFormDetails = async (id?: string) => {
    const { data } = await apiPrivate.get<any>(`/api/templates/${id}`);
    return data;
  };

  const getFormDetailsFill = async (id?: string) => {
    const { data } = await apiPrivate.get<any>(`/api/forms/${id}`);
    return data;
  };

  const getMyFormFill = async (id?: string) => {
    const { data } = await apiPrivate.get<any>(
      `/api/organization-template/get-by-template-id/${id}`
    );
    return data;
  };

  const getMyForms = async (params?: any) => {
    const { data } = await apiPrivate.get<any>(
      '/api/organization-template/get-my_templates',
      {
        params,
      }
    );
    return data;
  };

  const getInspections = async (params?: any) => {
    const { data } = await apiPrivate.get<any>('/api/get-my-forms', {
      params,
    });
    return data;
  };

  const login = async (body: any) => {
    const { data } = await apiPublic.post('/api/authenticate', body);
    return data;
  };

  const organizationTemplateImport = async (body: any) => {
    const { data } = await apiPrivate.post(
      '/api/organization-template/import',
      body
    );
    return data;
  };

  const getFormById = async (uuid?: string) => {
    const { data } = await apiPrivate.get<IForm>(`${API_URL}/${uuid}`);
    return data;
  };

  const getCategories = async () => {
    const { data } = await apiPrivate.get<any>('/api/categories');
    return data;
  };

  const getLocations = async () => {
    const { data } = await apiPrivate.get<any>('/api/locations');
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

  const getDashboards = async () => {
    const { data } = await apiPrivate.get<any>(`api/dashboard/by-category`);
    return data;
  };

  const getByLocation = async () => {
    const { data } = await apiPrivate.get<any>(`api/dashboard/by-location`);
    return data;
  };

  const getAssignedFormById = async (uuid?: string) => {
    const { data } = await apiPrivate.get<IForm>(`${API_URL}/${uuid}`);
    return data;
  };

  const addSurvey = async (body: any) => {
    const { data } = await apiPrivate.post('/api/templates', body);
    return data;
  };

  const fillSurvey = async (body: any) => {
    const { data } = await apiPrivate.post('/api/submit-form', body);
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
    login,
    getForms,
    getMyForms,
    getFormDetails,
    getMyFormFill,
    fillSurvey,
    getFormDetailsFill,
    getByLocation,
    organizationTemplateImport,
    getInspections,
    addForm,
    editForm,
    getFormById,
    copyForm,
    deleteFormById,
    addSurvey,
    editSurvey,
    getSurvey,
    getCategories,
    getLocations,
    deleteSurveyById,
    addAdvancedSurvey,
    editAdvancedSurvey,
    getAdvancedSurvey,
    getAssignedFormById,
    getDashboards,
  };
};
