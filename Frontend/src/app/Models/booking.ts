export interface Booking
{
  id:number;
  userId:number;
  destinationId:number;
  bookingDate:string;
  travelDate:string;
  travelers:number;
  status:string;
  totalPrice:number;
}