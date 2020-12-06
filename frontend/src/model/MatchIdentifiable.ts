import { match } from 'react-router-dom';

export type MatchIdentifiable = {
  match: match<{
    id: string;
  }>;
};
