export class ContractHeaderModule { 
  id!: string;
  code!: string;
  customer_id!: string;
  clinic_id!: string;
  contract_date!: string | null;
  contract_start_date!: string | null;
  contract_end_date!: string | null;
  subtotal!: string;
  discount_type!: string;
  discount_value!: string;
  tax_type!: string;
  tax_percentage!: string;
  tax_value!: string;
  grand_total!: string;
  term_of_payments_id!: string;
  status!: string;
  description!: string;
  created_at!: string;
  updated_at!: string;
}