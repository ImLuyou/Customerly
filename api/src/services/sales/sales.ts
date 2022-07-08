import type {
  QueryResolvers,
  MutationResolvers,
  SaleResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';

export const sales: QueryResolvers['sales'] = () => {
  return db.sale.findMany();
};

export const sale: QueryResolvers['sale'] = ({ id }) => {
  return db.sale.findUnique({
    where: { id },
  });
};

export const createSale = ({ input }) => {
  return db.sale.create({
    data: input,
  });
};

export const updateSale: MutationResolvers['updateSale'] = ({ id, input }) => {
  return db.sale.update({
    data: input,
    where: { id },
  });
};

export const deleteSale = ({ id }) => {
  return db.sale.delete({
    where: { id },
  });
};

export const Sale: SaleResolvers = {
  myClient: (_obj, { root }) =>
    db.sale.findUnique({ where: { id: root.id } }).myClient(),
};
