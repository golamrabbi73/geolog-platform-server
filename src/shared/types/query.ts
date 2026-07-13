export interface IQuery {
  searchTerm?: string;
  page?: string;
 limit?: string;

  // Core Sample
  rockType?: string;
  wellName?: string;

  // Well
  status?: string;
}