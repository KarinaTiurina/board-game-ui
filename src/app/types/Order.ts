import { Game } from "./Game";

export interface Order {
  orderId: number;
  games: Game[];
}