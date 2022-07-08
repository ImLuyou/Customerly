import type {
  QueryResolvers,
  MutationResolvers,
  MyClientResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';

export const myClients: QueryResolvers['myClients'] = ({ id }) => {
  return db.myClient.findMany({
    where: {
      owner: id,
    },
  });
};

export const myClientsByOwner = ({ owner }) => {
  return db.myClient.findMany({
    where: { owner },
  });
};

export const myClient: QueryResolvers['myClient'] = ({ id }) => {
  return db.myClient.findUnique({
    where: { id },
  });
};

export const myClientByOwner = ({ id, owner }) => {
  return db.myClient.findFirst({
    where: { id, owner },
  });
};

export const createMyClient: MutationResolvers['createMyClient'] = ({
  input,
}) => {
  return db.myClient.create({
    data: input,
  });
};

export const updateMyClient: MutationResolvers['updateMyClient'] = ({
  id,
  input,
}) => {
  return db.myClient.update({
    data: input,
    where: { id },
  });
};

export const updateMyClientByOwner = ({ id, owner, input }) => {
  return db.myClient.update({
    data: input,
    where: { id, owner },
  });
};

export const deleteMyClient: MutationResolvers['deleteMyClient'] = ({ id }) => {
  return db.myClient.delete({
    where: { id },
  });
};

export const MyClient: MyClientResolvers = {
  sales: (_obj, { root }) =>
    db.myClient.findUnique({ where: { id: root.id } }).sales(),
};
