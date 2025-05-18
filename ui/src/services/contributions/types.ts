export interface ContributionsResponse {
  /**
   * The fee associated with the loan calculation.
   */
  contributions: Contribution[];
  total: number;
  skip: number;
  limit: number;
}

export interface Contribution {
  /**
   * The unique identifier for the contribution.
   */
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  owner: string;
}
