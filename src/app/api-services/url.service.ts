import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  appconstant = "http://139.59.75.83:9999/LeadManagement/";

  // appconstant = "http://139.59.75.83:9999/LeadGenerationTool/";
  /* For Testing */
  // appconstant = "http://139.59.75.83:9999/LeadGenerationToolTesting/";
login = 'login'
  createBusinessContactApi = 'business/save';
  updateBusinessContactApi = 'business/update';
  getAllBusinessContactsApi = 'business/list';
  ImagAllBusinessContactsApi = 'business/uploadImage';
  ActivityBusinessApi = 'business/addActivity';
  BusiDownloadsApi = 'business/download';
  GetBusinessApi = 'business/get';
  CorporatePaginationApi = 'business/getPaginationCount';
  createRetailContactApi = 'retail/save';
  updateRetailContactApi = 'retail/update';
  getAllRetailContactsApi = 'retail/list';
  SearchContactsApi = 'retail/search';
  ActivityRetailApi = 'retail/addActivity';
  UploadRetailLeadApi = 'retail/uploadRetailLead';
  ImagAllRetailContactsApi = 'retail/uploadImage';
  DownloadsApi = 'retail/download';
  GetRetailLeadApi = 'retail/get';
  RetailPaginationApi = 'retail/getPaginationCount';
  searchBusinessContactApi = 'searchBusinessContact';
  CertiPaginationApi = 'certificate/getPaginationCount';
  getAllCertificationsApi = 'certificate/save';
  updategetAllCertificationsApi = 'certificate/update';
  ListgetAllCertificationsApi = 'certificate/list';
  GetCertificateApi = 'certificate/get';
  getAllTrainingApi = 'getAllTraining';
  updateContactApi = 'updateContact';
  TrainPaginationApi = 'training/getPaginationCount';
  getAllTrainingsaveApi = 'training/save';
  updategetAllTrainingsApi = 'training/update';
  ListgetAlltrainingsApi = 'training/list';
  GettrainingsApi = 'training/get';
  CategorySaveApi = 'category/save';
  CategoryUpdateApi = 'category/update';
  CategoryListApi = 'category/list';
  CatPaginationApi = 'category/getPaginationCount';
  LevelSaveApi = 'level/save';
  LevelUpdateApi = 'level/update';
  LevelListApi = 'level/list';
  LevelPaginationApi = 'level/getPaginationCount';
  clientSaveApi = 'client/save';
  clientUpdateApi = 'client/update';
  clientListApi = 'client/list';
  ClientPaginationApi = 'client/getPaginationCount';
  ServiceProviderSaveApi = 'serviceprovider/save';
  ServiceProviderUpdateApi = 'serviceprovider/update';
  ServiceProviderListApi = 'serviceprovider/list';
  ServicePaginationApi = 'serviceprovider/getPaginationCount';
  userSaveApi = 'user/save';
  userUpdateApi = 'user/update';
  userListApi = 'user/list';
  userGetApi = 'user/get';
  userSaveImage = 'user/saveImage';
  userGetImage = 'user/getImage'
  userPagination = 'user/getPaginationCount'
  DealSaveApi = 'deal/save'
  DealGetApi = 'deal/get'
  DeallistApi = 'deal/list'
  DealApi = 'deal/addActivity';
  DealUpdateApi = 'deal/updateDeal';
  DealUpdateDueDateApi = 'deal/updateDueDate';
  DealPaginationApi = 'deal/getPaginationCount';
  DashboardAPI = 'dashboard/get';
  DashboardTopUserAPI = 'dashboard/getTopUser';
  DashboardTopTrainingAPI = 'dashboard/getTopTraining';
  DashboardCertAPI = 'dashboard/getTopCert'
  DealTrend = 'dashboard/getDealTrend'
  LeadTrend = 'dashboard/getLeadTrend'
  constructor() { }
}
