// src/app/models/service.model.ts
export interface ServiceModel {
  category: string;
  serviceHeading: string;
  serviceName: string;
  tag?: string;
  timeTag: string;
  img: string;
  serviceInfo: string[];
  serviceList: string[];
  price: number;
  originalPrice: number;
}
