import { Questions } from "./questions";

export interface QuestionsAPIResponse {
    response_code: number;
    results: Questions[]
}
