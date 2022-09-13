export interface Video {
  caption: string;
  _id: string;
  video: {
    asset: {
      _id: string;
      url: string;
    };
  };
  _id: string;
  postedBy: {
    _id: string;
    userName: string;
    image: string;
  };

  comments: {
    comment: string;
    _key: string;
    postedBy: {
      _ref: string;
    };
  }[];

  likes: {
    postedBy: {
      _id: string;
      userName: string;
      image: string;
    };
  }[];
  userId: string;
}

export interface User {
  _id: string;
  userName: string;
  image: string;
  _type: string;
}
