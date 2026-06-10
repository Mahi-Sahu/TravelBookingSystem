export interface BookingRequest {
  destinationId:number;
  travelDate:string;
  travelServiceId:number;
  travelerIds:string[];
  totalPrice:number;
}