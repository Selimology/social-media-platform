import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const createOrSignUser = async (response: any, addUser: any) => {
  //Jason web token is returned from the server
  //sub used for uniqueID
  const decoded: { name: string; picture: string; sub: string } = jwt_decode(
    response.credential
  );

  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  };

  addUser(user);

  await axios.post(`http://localhost:3000/api/auth`, user);
};