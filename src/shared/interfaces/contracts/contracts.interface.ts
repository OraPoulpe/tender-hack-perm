export interface IContract {
  id?: number;
  number: string;
  customer_id?: number;
  customer: string;
  document_name: string;
  supplier_id?: number;
  supplier: string;
  creator_id?: number;
  agreements?: IAgreements[];
}

export interface IAgreements {
  id?: number;
  contract_id: string;
  document_name: string;
  created?: boolean;
  created_date?: string;
}
