export interface TravelService {
  id:string;
  destinationId:number;
  serviceName:string;
  serviceType:string;
  provider:string;
  price:number;
  duration:string;
  rating:number;
  serviceUrl?: string;
}