import { TvShow } from "./TvShow";
import { User } from "./User";

export interface ResponseData{
    list?: TvShow[];
    listSize: number;
    user: User
}