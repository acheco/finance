export interface Pot {
  id: number;
  theme: string;
  name: string;
  target_amount: number;
  total_amount: number;
  percentage: number;
}

interface theme {
  name: string;
  value: string;
}

export type PotPageProps = {
  pot?: Pot;
  pots: Pot[];
  themes: theme[];
  mode?: string;
  openModal: boolean;
};

export type PotFormProps = {
  pot?: Pot;
  mode?: string;
  themes: theme[];
};
