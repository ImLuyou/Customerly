import { useAuth } from '@redwoodjs/auth';

import MyClientByOwnerCell from 'src/components/MyClientByOwnerCell';

const MyClientPage = ({ id }) => {
  const { currentUser } = useAuth();

  return (
    <>
      <MyClientByOwnerCell id={String(id)} owner={currentUser.uid} />
    </>
  );
};

export default MyClientPage;
